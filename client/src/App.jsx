import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />   
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />  
        </Routes>
    </Router>

    </>
  )
}

export default App
