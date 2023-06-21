import React from 'react'
import Highlight from './Highlight'
import LaunchPad from './LaunchPad'
import "./launchPad.css"
import UpComing from './UpComing'
import Funded from "./Funded"
import Project from './Project'

function index() {
  return (
    <>
      <LaunchPad/>
      <UpComing/>
      <Highlight/>
      <Funded/>
      <Project/>
    </>
  )
}

export default index