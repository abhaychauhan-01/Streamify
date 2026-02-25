import React from 'react';
import { Navigate, Route , Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import CallPage from './pages/CallPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import OnBoardingPage from './pages/OnBoardingPage.jsx'
import  {Toaster} from "react-hot-toast";
import { BrowserRouter } from 'react-router';
import {useQuery,QueryClient,QueryClientProvider,} from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';

// use query when you want fetch some data you can do it using usestate + useref but it will be easy when you use useQuery
const App = () => {
  const {data:authData , isLoading,error}=useQuery({
    queryKey:["authUser"],
    queryfn: async ()=>{
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    }
  });
  const authUser=authData?.user
  return (
    <div className=' h-screen' data-theme='night'>
    
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to ="/login"/>}/>
        <Route path="/login" element={!authUser ?<LoginPage/>: <Navigate to ="/"/>}/>
        <Route path="/signup" element={!authUser?<SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/notification" element={authUser?<NotificationPage/>:<Navigate to="/login"/>}/>
        <Route path="/call" element={authUser?<CallPage/>:<Navigate to="/login"/>}/>
        <Route path="/chat" element={authUser?<ChatPage/>:<Navigate to="/login"/>}/>
        <Route path="/onboarding" element={authUser?<OnBoardingPage/> : <Navigate to="/login"/>}/>
      
      </Routes>
      <Toaster/>
    </div>  
  )
}

export default App
