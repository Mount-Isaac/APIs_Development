import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/utils/AuthProvider'
import PrivateRoutes from './components/utils/PrivateRoutes'

// components
import Homepage from './components/pages/universal/Homepage'
import Navbar from './components/pages/universal/Navbar'
import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import Page404 from './components/pages/universal/Page404'
import Post from './components/pages/posts/Posts'
import User from './components/pages/user/User'
import About from './components/pages/universal/About'

export default function App() {
  return (
    <AuthProvider>
        <Navbar/>
        <div className='container p-5 my-5'>
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path='/api/post' element={<Post/>}/>
            </Route>
              <Route path='/api/user' element={<User/>}/>
            <Route exact path='/' element={<Homepage/>}/>
            <Route  path='/api/auth/register' element={<Register/>}/>
            <Route  path='/api/auth/login' element={<Login/>}/>
            <Route path='/api/about' element={<About/>}/>
            <Route  path='*' element={<Page404/>}/>
          </Routes>
        </div>
      </AuthProvider>

  )
}
