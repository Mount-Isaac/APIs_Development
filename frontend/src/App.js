import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/utils/AuthProvider'
import PrivateRoutes from './components/utils/PrivateRoutes'

// components
import Homepage from './components/pages/universal/Homepage'
import Navbar from './components/pages/universal/Navbar'
import Page404 from './components/pages/universal/Page404'
import About from './components/pages/universal/About'
import Footer from './components/pages/universal/Footer'

import Register from './components/pages/auth/Register'
import Login from './components/pages/auth/Login'
import User from './components/pages/user/User'

import CreatePost from './components/pages/posts/CreatePost'
import ViewPost from './components/pages/posts/ViewPost'
import EditPost from './components/pages/posts/EditPost'
import AllPosts from './components/pages/posts/AllPosts'
import UserPosts from './components/pages/posts/UserPosts'
import Post from './components/pages/posts/Post'

export default function App() {
  return (
    <AuthProvider>
        <div style={{paddingTop:100}} className='bg-white'>
        <Navbar/>
          <Routes>
            {/* requires authentications */}
            <Route element={<PrivateRoutes/>}>
              <Route path='/api/post/create' element={<CreatePost/>}/>
              <Route path='/api/post/edit/:id' element={<EditPost/>}/>
            </Route>

            {/* user routes */}
            <Route path='/api/user' element={<User/>}/>
            <Route  path='/api/auth/register' element={<Register/>}/>
            <Route  path='/api/auth/login' element={<Login/>}/>

            {/* posts routes */}
            <Route path='/api/post' element={<Post/>}/>
            <Route path='/api/post/view/:id' element={<ViewPost/>}/>
            <Route path='/api/posts/all/' element={<AllPosts/>}/>
            <Route path='/api/posts/user/:id' element={<UserPosts/>}/>

            {/* universal routes */}
            <Route exact path='/' element={<Homepage/>}/>
            <Route path='/api/about' element={<About/>}/>
            <Route  path='*' element={<Page404/>}/>
          </Routes>
        </div>
        <Footer/>
      </AuthProvider>

  )
}
