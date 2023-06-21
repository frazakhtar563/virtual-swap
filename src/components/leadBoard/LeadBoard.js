import React from "react";
import "./leadBoard.css";
import proposalIcon from "../../Assets/Images/proposal.png";

function LeadBoard() {
  return (
    <div className="leadBoard_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <h1 className="text_teams">Teams & Profiles</h1>
            <p className="text_showOff">
              Show off your stats and collectibles with your unique profile.
              Team features will be revealed soon!
            </p>
            <div className=" pt-3 voting_small_div_section1">
              <div className="voting_card container d-flex flex-wrap text-white">
                <div className=" d-flex justify-content-center align-items-center ms-0 pe-2 btn_proposal_icon_bg">
                  <img
                    src={proposalIcon}
                    className="img-fluid"
                    width={"25px"}
                  />
                  {/* <span className="fs-5"><Fa500Px/></span> */}
                </div>
                <div className=" d-flex justify-content-center align-items-center p-1">
                  <span>MAKE A PROPOSAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadBoard;
