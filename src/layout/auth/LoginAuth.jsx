import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/auth/LogIn'

function LoginAuth() {
  return (
    <div>
      <Routes>
      <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default LoginAuth