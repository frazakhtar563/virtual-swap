import React from "react";
import Nft_Navbar from "../NftNavbar";
import "./Activity.css";
import Acttable from "./Acttable";

function Activity() {
  return (
    <>

    <div className="activity_bg">
    <Nft_Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="tactivity mb-5 mt-5">Activity</div>
          </div>
        </div>
      </div>
    </div>
    <Acttable/>
    </>
  );
}

export default Activity;
