import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

const HomePage = () => {
  const queryClient=useQueryClient();
  const [outgoingRequestsIds,setOutgoingRequestsIds]=useState([]);
  return (
    <div>
      HomePage
    </div>
  )
}

export default HomePage
