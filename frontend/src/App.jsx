import React from 'react';
import { Route , Routes } from 'react-router';
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
  const {data , isLoading,error}=useQuery({
    queryKey:["todos"],
    queryfn: async ()=>{
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    }
  })
  return (
    <div className=' h-screen' data-theme='night'>
    
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/notification" element={<NotificationPage/>}/>
        <Route path="/call" element={<CallPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/onboarding" element={<OnBoardingPage/>}/>
      
      </Routes>
      <Toaster/>
    </div>  
  )
}

export default App
