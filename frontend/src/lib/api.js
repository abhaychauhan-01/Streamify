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
  const response = await axiosInstance.post("/auth/logout", data);
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      return null; // ✅ user not logged in (normal case)
    }
    throw err; // real error
  }
};
export const completeOnboarding =async (userDate)=>{
  const response= await axiosInstance.post("/auth/onboarding",userDate);
  return response.data;
}