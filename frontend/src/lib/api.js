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
export const completeOnboarding =async (userDate)=>{
  const response= await axiosInstance.post("/auth/onboarding",userDate);
  return response.data;
}