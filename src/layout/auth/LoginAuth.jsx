import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/auth/LogIn'

function LoginAuth() {
  document.title = '   صفحه ورود |  پنل فروشگاهی ';

  return (
    <div>
      <Routes>
      <Route path='/auth/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default LoginAuth