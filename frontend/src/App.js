import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/utils/AuthProvider'

// components
import Homepage from './components/pages/universal/Homepage'
import Navbar from './components/pages/universal/Navbar'

export default function App() {
  return (
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
      </Routes>
    </AuthProvider>
  )
}
