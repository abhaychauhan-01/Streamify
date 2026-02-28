import mongoose, { connections } from "mongoose";
export const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.name} `);
    }catch(err){
        console.log("connection falied",err);
        process.exit(1);//1 means failure
    }
}