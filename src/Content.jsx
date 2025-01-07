import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/LogIn'
import Album from './pages/album/Album'
import Dashbord from './pages/dashboard/Dashbord'
import Category from './pages/category/Category'
import Products from './pages/category/Products'
import Colors from './pages/colors/Colors'

function Content() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Dashbord />} />
      <Route path='/admin/album' element={<Album />} />
      <Route path='/admin/category' element={<Category />} />
      <Route path='/admin/addproduct' element={<Products />} />
      <Route path='/admin/colors' element={<Colors />} />

    </Routes>
  )
}

export default Content