import { upsertStreamUser } from "../lib/stream.js";
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
    try { await upsertStreamUser({id:newUser._id.toString(),
      name:newUser.fullName,
      image:newUser.profilePic ||"",
     });
      console.log(`Stream User Created for ${newUser.fullName}`)
    } catch (error) {
      console.log("Error Creating stream User",error);
    }
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
 try{
 const{email,password}=req.body;
 if(!email||!password)return res.status(400).json({message:"All fields are required"});
 const user=await User.findOne({email});
 if(!user)return res.status(404).json({message:"Invalid email or password"});
  const ispass=await user.matchPassword(password);
  if(!ispass)return res.status(401).json({message:"Wrong Password"});

   const token =jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{
      expiresIn:"7d"
    })
    res.cookie("jwt",token,{
      maxAge:7*24*60*60*1000,
      httpOnly:true, //prevents XSS attacks
      sameSite:"strict",//prevents CSRF attacks
      secure:process.env.NODE_ENV==="production",
    })
    res.status(200).json({success:true,user});

 }catch(err){
 console.log("Error in login controller",err);
 res.status(500).json({message:"Internal Server Error"});
 }
}
export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success:true,message:"Logout Successful"});
}
export async function onboard(req,res) {
  // we can access req.user here because onboard is a protectedRoute we can not access it on other routes

  try {
    const userId = req.user._id
    const {fullName , bio  , nativeLanguage,learningLanguage, location}= req.body;
    if(!fullName || !bio || !nativeLanguage||!learningLanguage||!location) return res.status(400).json({message:"All Fields are required",
      missingFields:[
        !fullName&&"fullName",
        !bio&&"bio",
        !nativeLanguage&&"nativeLanguage",
        !learningLanguage&&"learningLanguage",
        !location&&"location",
      ].filter(Boolean)
    });
    const updatedUser=await User.findByIdAndUpdate(userId,{...req.body,isOnboarded:true},{new:true})
    if(!updatedUser) return res.status(404).json({message:"User not Found"});
    res.status(200).json({success:true,user:updatedUser});
  } catch (error) {
    console.error("Onboarding Error",error);
    res.status(500).json({message:"Internal Server Error"});
  }
}
