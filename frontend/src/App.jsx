import Navbar from './components/Navbar'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/signuppage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUserAuthStore } from './store/userAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useUserAuthStore();
  const { theme } = useThemeStore();

  console.log({onlineUsers}); // Log online users to console

    useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div> 
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ?  <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path="/login" element={!authUser ? <LoginPage />  : <Navigate to='/' />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />     
        </Routes>
        <Toaster />

</div>
  )
}

export default App