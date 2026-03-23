import { QueryClient, useMutation } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser"
import toast from "react-hot-toast";
import { useState } from "react";
import { completeOnboarding } from "../lib/api.js";
import { CameraIcon } from "lucide-react";

const OnBoardingPage = () => {
   const {authUser}=useAuthUser();
   const [formState,setFormState]=useState({
    fullName:authUser?.fullName ||"",
    bio:authUser?.bio || "",
    nativeLanguage:authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage ||"",
    location:authUser?.location || "",
    profilePic: authUser?.profilePic ||"",

   });
   const {mutate:onboardingMutation,isPending}=useMutation({
    mutationFn: completeOnboarding,
    onSuccess:()=>{
      toast.success("Profile onBoarded successfully");
      QueryClient.invalidateQueries({queryKey:["authUser"]});
    }
   });
 const handleSubmit =(e)=>{
  e.preventDefault();
  onboardingMutation(formState);
 }
                  console.log(authUser);
                console.log(formState.profilePic);
   return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <div className="text-2xl sm:text-sxl font-bold text-center mb-6">Complete Your profile</div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/*Profile pi container*/}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/**image preview*/}
              <div className="w-32 h-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic?(
                <img src={formState.profilePic} alt="profile Preview"
                className="w-full h-full object-cover"/>):(
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40"/>

                  </div>
                )}

              </div>


            </div>
          </form>

        </div>

      </div>
     
    </div>
  )
}

export default OnBoardingPage
