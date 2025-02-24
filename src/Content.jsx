import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/LogIn'
import Brands from './pages/brands/Brands'
import Dashbord from './pages/dashboard/Dashbord'
import Addcategories from './pages/category/Addcategories'
import Garainty from './pages/garanty/Garainty'
import CategoriesTable from './pages/category/CategoriesTable'
import ColorsTable from './pages/colors/ColorsTable'
function Content() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Dashbord />} />

      <Route path='/admin/brands' element={<Brands />} />
      <Route path='/admin/brands/addbrands'/>
      <Route path='/admin/categories' element={<CategoriesTable/>}>
        <Route path=':categoriesId' />
      </Route>
      <Route path={'/admin/addcategories'} element={<Addcategories />} >
      <Route path=':productId' />
      </Route>
      <Route path='/admin/garanty' element={<Garainty />} />
      <Route path='/admin/colors' element={<ColorsTable/>} />
      
    </Routes>
  )
}

export default Content