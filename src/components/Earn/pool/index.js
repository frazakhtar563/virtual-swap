import React from 'react'
import EarnNavbar from '../EarnNavbar'
import './Pool.css'
import Pool from './Pool'
import PoolBtn from './PoolBtn'
import PoolTable from './PoolTable'

function index() {
  return (
    <div>
      <EarnNavbar />
      <Pool />
      <PoolBtn />
      <PoolTable />
    </div>
  )
}

export default index
