import React from "react";
import "./voting.css";
import proposalIcon from "../../Assets/Images/proposal.png";
function Voting() {
  return (
    <div className="voting_bg">
      <div className="row mt-5">
        <div className="col-md-12 mt-5 mb-5">
          <h2 className="text_voting text-center">Voting</h2>
          <p className="text_have_your">
            Have your say in the future of the PancakeSwap Ecosystem
          </p>

          <div className=" pt-3 voting_small_div_section1">
            <div className="voting_card container d-flex flex-wrap text-white">
              <div className=" d-flex justify-content-center align-items-center ms-0 pe-2 btn_proposal_icon_bg">
                <img src={proposalIcon} className="img-fluid" width={"25px"} />
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
  );
}

export default Voting;
