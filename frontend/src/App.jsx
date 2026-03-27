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
import PageLoader from './components/PageLoader.jsx';
import { getAuthUser } from './lib/api.js';
import useAuthUser from './hooks/useAuthUser';
import Layout from "./components/Layout.jsx"
import {useThemeStore} from '../store/useThemeStore';
// use query when you want fetch some data you can do it using usestate + useref but it will be easy when you use useQuery
const App = () => {
const {isLoading,authUser}=useAuthUser();
const isAuthenticated=Boolean(authUser)
const {theme,setTheme}=useThemeStore();
const isOnboarded =authUser?.isOnboarded
  if(isLoading) return <PageLoader/>;

  return (
    <div className=' h-screen' data-theme={theme}>
    <button> </button>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout showSidebar={true}><HomePage/></Layout>):(
          <Navigate to={!isAuthenticated ? "/login": "/onboarding"}/>
        )}/>
        <Route path="/login" element={!isAuthenticated ?<LoginPage/>: <Navigate to={isOnboarded ?"/":"/onboarding"}/>}/>
        <Route path="/signup" element={!isAuthenticated?<SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/notification" element={isAuthenticated?<NotificationPage/>:<Navigate to="/login"/>}/>
        <Route path="/call" element={isAuthenticated?<CallPage/>:<Navigate to="/login"/>}/>
        <Route path="/chat" element={isAuthenticated?<ChatPage/>:<Navigate to="/login"/>}/>
        <Route path="/onboarding" element={isAuthenticated?(
          !isOnboarded?(<OnBoardingPage/>):(<Navigate to="/"/>)
        ):(<Navigate to="/login"/>)}/>
      
      </Routes>
      <Toaster/>
    </div>  
  )
}

export default App
