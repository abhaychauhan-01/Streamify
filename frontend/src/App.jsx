import React from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import OnBoardingPage from './pages/OnBoardingPage'

const App = () => {
  return (
    <div className=' h-screen' data-theme='night'>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/notification" element={<NotificationPage/>}/>
        <Route path="/callpage" element={<CallPage/>}/>
        <Route path="/chatpage" element={<ChatPage/>}/>
        <Route path="/onboarding" element={<OnBoardingPage/>}/>

      </Routes>
    </div>  
  )
}

export default App
