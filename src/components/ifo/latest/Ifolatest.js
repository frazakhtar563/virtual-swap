import React from "react";
import "./Ifo_latest.css";
import HowIcon from "../../../Assets/Images/howIcon.png";
import faceIcon from "../../../Assets/Images/uu3.png";
import conn_icon from "../../../Assets/Images/conn.png";

function Ifolatest() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="col-lg-6 col-md-6  mb-5">
          <div className="">
            <div className="text-ifo">IFO: Initial Farm Offerings</div>
            <div className="">
              <span className="col1_section_para">
                Buy new tokens launching on BNB Smart Chain
              </span>
            </div>
            {/* Section 1 small div */}
            <div className="row btn_how_does_bg mt-4 text-white">
              <div className="col-3 d-flex text-center align-items-center gra">
                <img
                  src={HowIcon}
                  className="img-fluid"
                  width={"36px"}
                  alt=""
                />
              </div>
              <div className="col-9 d-flex justify-content-center align-items-center">
                <span className="btn_how_does">How does it work</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6  d-flex justify-content-center">
          <div className=" if_latest_card d-flex flex-column ">
            <div className="row mt-4">
              <div className="col-8 text-white ps-5">
                <h3 className="text_stake_ifo">Stake CAKE</h3>
                <p className="text_stake_earn" style={{ color: "white" }}>
                  Stake, Earn – And more!
                </p>
              </div>
              <div className="col-4 text-end">
                <div className="container-fluid me-0 ">
                  <img src={faceIcon} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="row flex-row text-white pt-3">
              <div className="col">
                <div className="container d-flex py-5 row2">
                  <div className="row flex-row">
                    <div clssName="col p-2 ">
                      <span className="text_ifo_flexible">FLEXIBLE APY</span>
                    </div>
                    <div clssName="col">
                      <span className="text_ifo_flexible">FLEXIBLE APY</span>
                    </div>
                  </div>
                  <div className="row">
                    <div clssName="col">
                      <span className="text_ifo_value">3.848%</span>
                    </div>
                    <div clssName="col">
                      <span className="text_ifo_value">Up to 54%</span>
                    </div>
                  </div>
                </div>

                <div className="row btn_connect_if_bg ms-5 text-white">
                  <div className="col-3 d-flex text-center align-items-center btn_con_icon_bg">
                    <img
                      src={conn_icon}
                      className="img-fluid"
                      width={"36px"}
                      alt=""
                    />
                  </div>
                  <div className="col-9 d-flex justify-content-center align-items-center">
                    <span className="btn_how_does text-dark">
                      Connect Wallet
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-2">
              <div className="col m-3">
                <button type="button" class="btn btn-primary buttonp">
                  Auto/Locked
                </button>
              </div>
              <div className="col text-end m-3">
                <button
                  type="button"
                  class="btn btn-link"
                  style={{ color: "cyan" }}
                >
                  Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ifolatest;
