import { axiosInstance } from "./axios";

export const signup = async (data) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};
export const login = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout"); 
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    return null;
  }
};
export async function getUserFriends() {
  const response=await axiosInstance.get("/users/friends");
  return response.data;
  
}
export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response=await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}
export async function sendFriendRequest(userId) {
  const response =await axiosInstance.get(`/users/friend-request/${userId}`);
  return response.data;
}
export const completeOnboarding =async (userDate)=>{
  const response= await axiosInstance.post("/auth/onboarding",userDate);
  return response.data;
}