
const OnBoardingPage = () => {
  const {data:authData , isLoadingm}=useQuery({
    queryKey:["authUser"],
    queryFn: async ()=>{
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry:false,// auth check
  });
  return (
    <div>
      Boarding
    </div>
  )
}

export default OnBoardingPage
