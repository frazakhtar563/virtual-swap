import React from "react";
import "./Finished.css";
import work from "../../../Assets/Images/notice.png";

function Finished() {
  return (
    <div className="finished_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <div className="row">
              <h1 className="text_ifo">IFO: Initial Farm Offerings</h1>
              <p className="text_buyNew">
                Buy new tokens launching on BNB Smart Chain
              </p>

              <div className=" pt-3 voting_small_div_section1">
                <div className="voting_card container d-flex flex-wrap text-white">
                  <div className=" d-flex justify-content-center align-items-center ms-0 pe-2 btn_proposal_icon_bg">
                    <img
                      src={work}
                      className="img-fluid"
                      width={"25px"}
                      alt=""
                    />
                  </div>
                  <div className=" d-flex justify-content-center align-items-center ps-3">
                    <span>How does it work</span>
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

export default Finished;
