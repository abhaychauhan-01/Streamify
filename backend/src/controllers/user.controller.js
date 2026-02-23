import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req,res){
    try {
        const currentUserId=req.user.id;
        const currentUser = req.user;
        const RecommendedUser = await User.find({
            $and:[
                {_id:{$ne:currentUserId}}, //exclude current user from recommended user list
                {$id:currentUser.friends}, // exclude user's friends too
                {isOnboarded:true}

            ]
        })
        res.status(200).json(getRecommendedUsers);
    } catch (error) {
        console.error("error in getrecommended controller",error.messsage);
        res.status(500).json({message:"internal Server Error"});
    }
}

export async function getMyFriends(req,res){
    try {// populate is used to get friends data , if we only want friends it then we will not use it
        const user=await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);

    } catch (error) {
        console.error("Error in getMyFriends controller",error.message);
        re.status(500).json({message:"Internal Server error"});
    }
}
export async function sendFriendRequest(req,res){
    try {
        const myId=re.user.id;
        const{id:recipientId}=req.params;
        //prevent sending req to yourself
        if(myId==recipientId)
            return res.status(400).json({message:"You can't send friend request to yourself"});
        const recipient=await User.findById(recipientId);
        if(!recipient) return res.status(404).json({message:"recipient not found"});
        //check if user is already friend
if(recipient.friends.includes(myId)){
    return res.status(400).json({message:"you are already friends with this user"});
}
//check if a req already exist
 const existingRequest=await FriendRequest.findOne({
    $or:[{
        sender:myId,recipient:recipientId
    },
    {sender:recipientId,recipient:myId},

    ],
 });
 if(existingRequest)return res.status(400)({message:"A friend Request exists between you and this user"});
  const friendRequest = await FriendRequest.create({
    sender:myId,
    recipient:recipientId,
  });
  res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}