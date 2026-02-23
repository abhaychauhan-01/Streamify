import {StreamChat} from "stream-chat";
import "dotenv/config";

// creating the user in Stream platform
const apikey =process.env.STEAM_API_KEY;
const apisecret=process.env.STEAM_API_SECRET;
if(!apikey||!apisecret){
    console.error("Stream API key or Secret is missing");

}

const streamClient =StreamChat.getInstance(apikey,apisecret);
export const upsertStreamUser= async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }
    catch(err){
console.error("Error upserting Stream User",err);
    }
}
export const generateStreamToken=(userId)=>{ try {// ensure userid is a string
    const userIdString=userId.toString();
    return streamClient.createToken(userIdString);

} catch (error) {
    console.error("Error generating Stream token",error);
    resizeBy.status(500).json({message:"Internal Server Error"});
}};