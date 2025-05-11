import React from 'react'
import Cards from './Cards'
import ProductTable from './ProductTable'
import SaleChart from './SaleChart'

function Dashbord() {

  document.title = ' داشبرد |  پنل فروشگاهی';


  return (
    <div>
      <Cards />
      <div className='md:flex md:gap-4 mt-5'>
        <SaleChart />
        <ProductTable />
      </div>
    </div>
  )
}

export default Dashbord