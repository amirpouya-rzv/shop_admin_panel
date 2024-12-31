import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Sidemenu() {
  const navigate = useNavigate()
  const [islogin, setIsLogIn] = useState(false);
const ExitButton =(e)=>{
  navigate('/auth/login')
  const loginToken   = localStorage.removeItem("loginToken");

}


  return (
    <div className='bg-emerald-100 h-screen'>
      <button onClick={ExitButton}>خروج</button>
    </div>
  )
}

export default Sidemenu