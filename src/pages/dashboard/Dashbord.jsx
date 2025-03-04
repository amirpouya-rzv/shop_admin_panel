import React from 'react'
import Card from './Card'
import Cards from './Cards'
import ProductTable from './ProductTable'
import SaleChart from './SaleChart'

function Dashbord() {


  return (
    <div>
      {/* <Card /> */}
      <Cards />
      <div className='flex'>
        <SaleChart />
        <ProductTable />
      </div>
    </div>
  )
}

export default Dashbord