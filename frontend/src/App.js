import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/utils/AuthProvider'

// components
import Homepage from './components/pages/universal/Homepage'
import Navbar from './components/pages/universal/Navbar'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Page404 from './components/pages/universal/Page404'

export default function App() {
  return (
    <AuthProvider>
        <Navbar/>
        <div className='container p-5 my-5'>
          <Routes>
            <Route exact path='/' element={<Homepage/>}/>
            <Route  path='/api/auth/register' element={<Register/>}/>
            <Route  path='/api/auth/login' element={<Login/>}/>
            <Route  path='*' element={<Page404/>}/>
          </Routes>
        </div>
      </AuthProvider>

  )
}
