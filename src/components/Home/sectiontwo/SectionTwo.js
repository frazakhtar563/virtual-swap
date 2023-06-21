import React from "react";
// import "./SectionTwo.css";
import trade_icon from "../../../Assets/Images/Maskgroup2.png";
import Video from "../../../Assets/transparent_1.gif";
import Coin from "../../../Assets/Coin.gif";
import "../../../App.css"
import './SectionTwo.css'

function SectionTwo() {
  return (
    <div className="background_two">
    <div className="container">
      <div className="row  d-flex justify-content-center align-items-center mt-5">
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div>
            {/* <img src={Video} width={"750px"} className="img-fluid pic_animation" alt="" /> */}
            <img src={Coin} width={"750px"} className="img-fluid pic_animation" alt="" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 d-flex justify-content-center">
          <div className="row sectionTwo_responsive ">
            <div className="col-12 d-flex justify-content-center flex-column ">
              <div className="text_connect_with">connect with</div>
              <div className="text_virtual_bridge mt-2">
                Virtual Swap & Bridge the Gap
              </div>
              <div className="text-dammy">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut.
              </div>
            </div>
            <div className="row   mt-4">
              <div className="col-md-8 d-flex mobile_center gap-2">
             

              <div class="">
                <div className="align-items-center text_amount">
                  <button className=" d-flex justify-content-start align-items-center btn_trade_bg">
                    <div className="btn_trade_icon_bg p-2">
                      <img
                        src={trade_icon}
                        className="img-fluid"
                        alt=""
                        width={"30px"}
                      />
                    </div>
                    <div className="trade_font ps-3">Trade Now</div>
                  </button>
                </div>
              </div>
              <div class="">
                <div className="  align-items-center text_amount ms-4">
                  <button className="btn_lear_bg">LEARN MORE</button>
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

export default SectionTwo;
