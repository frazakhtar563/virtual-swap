import React from 'react'
import HitJacket from './HitJacket'
import "./jacket.css"
import JackpotBanner from './JackpotBanner'
import JackpotHowTo from './JackpotHowTo'
import JackpotRules from './JackpotRules'
import JackpotWait from './JackpotWait'

function index() {
  return (
    <div>
        <HitJacket/>
        <JackpotBanner/>
        <JackpotWait/>
        <JackpotHowTo/>
        <JackpotRules/>
    </div>
  )
}

export default index