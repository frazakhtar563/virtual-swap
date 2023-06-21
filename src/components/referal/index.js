import React from "react";
import "./referral.css";
import RefClaim from "./RefClaim";
import RefDashboard from "./RefDashboard";
import RefFaq from "./RefFaq";
import RefFriend from "./RefFriend";
import RefInvite from "./RefInvite";
import RefList from "./RefList";

function index() {
  return (
    <>
      <RefFriend />
      <RefClaim />
      <RefDashboard />
      <RefList />
      <RefInvite />
      <RefFaq/>
    </>
  );
}

export default index;
