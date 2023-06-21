import React from 'react'
import GotSuggestion from './GotSuggestion'
import Proposal from './Proposal'
import Voting from './Voting'
import "./voting.css"

function index() {
  return (
    <div>
        <Voting/>
        <Proposal/>
        <GotSuggestion/>
    </div>
  )
}

export default index