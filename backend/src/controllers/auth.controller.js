import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "password must be at least 8 characters" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });
    const existinguser = await User.findOne({ email });
    if (existinguser)
      return res.status(400).json({
        message: "Email already used ! please use a different Email",
      });
    const idx = Math.floor(Math.random() * 100) + 1; // generate a no. b/w 1 to 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });
    const token =jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
      expiresIn:"7d"
    })
    res.cookie("jwt",token,{
      maxAge:7*24*60*60*1000,
      httpOnly:true, //prevents XSS attacks
      sameSite:"strict",//prevents CSRF attacks
      secure:process.env.NODE_ENV==="production",
    })
     res.status(201).json({success:true,user:newUser});
    
  } catch (err) {console.log("Error in signup controller",err);
    res.status(500).json({message:"Internal Server Error"});
  }
}
export async function login(req, res) {
  res.send("login route");
}
export function logout(req, res) {
  res.send("logout route");
}
