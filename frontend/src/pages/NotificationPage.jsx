import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import {getFriendRequests,acceptFriendRequest, acceptFriendRequest} from "../lib/api";

const NotificationPage = () => {
  const QueryClient=useQueryClient();
  const {data:friendRequests,isLoading}=useQuery({
    queryKey:["friendRequests"],
    queryFn:getFriendRequests,
  });
  const {mutate:acceptFriendRequest,isPending}=useMutation({
    mutationFn:acceptFriendRequest,
    onSuccess:()=>{
      QueryClient.invalidateQueries({queryKey:["friendRequests"]});
      QueryClient.invalidateQueries({queryKey:["friends"]});
    },
  });
  const incomingRequests= friendRequests?.incomingReqs||[];
  const acceptedRequests=friendRequests?.acceptedRequests||[];
  return (
    <div className="p-4 sm:p-6 lg:p-8">
<div className="container mx-auto max-w-4xl space-y-8">
  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>
  {isLoading?(<div className="flex justify-center py-12">
    <span className="loading loading-spinner loading-lg"></span>
  </div>):({incomingRequests.length > 0 &&(<section className="space-y-4">
    <h2></h2></section>)})}
  </div> 
    </div>
  )
}

export default NotificationPage
