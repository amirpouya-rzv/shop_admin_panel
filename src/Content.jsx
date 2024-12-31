import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Questionnaire from './questionnaire/Questionnaire '
import Login from './pages/auth/LogIn'

function Content() {
  return (
<Routes>
  <Route path='/login' element={<Login/>}/>
<Route path='/' element={""}/>    
</Routes>
)
}

export default Content