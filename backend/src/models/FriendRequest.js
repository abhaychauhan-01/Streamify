import mongoose from "mongoose";
const friendRequestScehma=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted"],
        default:"pending",
    },

},{
    timestamps:true, // to get the createdAt and UpdatedAt fields automatically
});
const FriendRequest=mongoose.model("FriendRequest",friendRequestScehma);
export default FriendRequest;