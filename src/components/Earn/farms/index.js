import React from 'react'
import EarnNavbar from '../EarnNavbar'
import FarmButton from './FarmButton'
import Farms from './Farms'
import './Farms.css'
import FarmTable from './FarmTable'

function index() {
  return (
    <div className="farms_bg">
      {/* <EarnNavbar /> */}
      <Farms />
     <FarmButton />
       <FarmTable />
    </div>
  )
}

export default index
