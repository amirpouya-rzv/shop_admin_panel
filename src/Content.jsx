import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/LogIn'
import Brands from './pages/brands/Brands'
import Dashbord from './pages/dashboard/Dashbord'
import Addcategories from './pages/category/Addcategories'
import CategoriesTable from './pages/category/CategoriesTable'
import ColorsTable from './pages/colors/ColorsTable'
import Breadcrumb from './component/Breadcrumb/Breadcrumb'
import Grranty from './pages/garranty/Grranty'
import Products from './pages/products/Products'
import AddProducts from './pages/products/AddProducts'
// import Essay from './pages/essay/Essay'
import Roles from './pages/roles/Roles'
import AddRole from './pages/roles/AddRole'
import UsersTable from './pages/users/UsersTable'
import Users from './pages/users/Users'
import AddUsre from './pages/users/AddUsre'
import SeeallRoles from './pages/roles/SeeallRoles'
function Content() {
  return (
    <div>
      <Breadcrumb />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Dashbord />} />

        {/*  برندها*/}
        <Route path='/admin/brands' element={<Brands />} />
        <Route path='/admin/brands/addbrands' />


        {/* دسته بندی محصولات */}
        <Route path='/admin/categories' element={<CategoriesTable />}>
          {/* <Route path=':categoriesId' element={<CategoriesTable />} /> */}
        </Route>
        <Route path='/admin/categories/categoriesId' element={<CategoriesTable />} />
        <Route path='/admin/categories/addcategories' element={<Addcategories />} />
        <Route path='/admin/categories/addcategories/:CategoriesId' element={<Addcategories />} />


        {/* گارانتیها */}
        <Route path='/admin/garranty' element={<Grranty />} />

        {/* رنگها */}
        <Route path='/admin/colors' element={<ColorsTable />} />

        {/* محصولات */}
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/addproducs' element={<AddProducts />} >
          <Route path=':productId' />
        </Route>


        {/* نقشها */}
        <Route path='/admin/roles' element={<Roles />} />
        <Route path='/admin/roles/add-role' element={<AddRole />} >
          <Route path='/admin/roles/add-role/:rolesId' element={<AddRole />} />
        </Route>
        <Route path='/admin/permissions' element={<SeeallRoles />} />


        {/* کاربران */}
        <Route path='/admin/users' element={<Users />} />
        <Route path='admin/users/add-users' element={<AddUsre />} />


      </Routes>
    </div>
  )
}

export default Content