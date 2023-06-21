import React from "react";
import Images from "../../Assets/transparent_1.gif";
import "./voting.css";
import proposalIcon from "../../Assets/Images/proposal.png";

function GotSuggestion() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <div className="container pb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 col-12 d-flex justify-content-center">
                <div className="">
                  <img src={Images} className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="container text-center text-lg-start">
                  <h1 className="voting_section3_heading pt-5">
                    GOT A SUGGESTION ?
                  </h1>
                  <p className="text-white voting_community">
                    Community proposals are a great way to see how the community
                    feels about your ideas.They won't necessarily be implemented
                    if the community votes successful, but suggestions with a
                    lot of community support may be made into Core proposals.
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
        </div>
      </div>
    </div>
  );
}

export default GotSuggestion;
