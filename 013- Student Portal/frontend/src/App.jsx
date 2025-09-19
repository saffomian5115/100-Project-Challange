import { useState } from 'react'
import Navbar from './components/navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/authContext';
import Login from './pages/login';
import Signup from './pages/signup';
import Announcements from './pages/announcements';



function App() {
  const {user} = useAuth();
  function ProtectedRoute({children}){
    const token = user.token;
    if(!token){
      return <Navigate to='/auth/login' replace/>
    }
    return children
  }

  return (
    <>
      <div className='w-screen min-h-screen text-gray-100 tracking-wide font-medium' style={{backgroundImage:"url('/imgs/background.jpg')"}}> 
      <Navbar />
      <div className='pt-10 bg-transparent'>
        <Routes>
        <Route path='/' element={<h1>dashboard</h1>} />
        <Route path='/students' element={<ProtectedRoute><h1>student</h1></ProtectedRoute>} />
        <Route path='/announcements' element={<ProtectedRoute><Announcements/></ProtectedRoute>} />
        <Route path='/auth/login' element={<Login/>} />
        <Route path='/auth/signup' element={<Signup/>} />
      </Routes>
      </div>

      </div>
    </>
  )
}

export default App
