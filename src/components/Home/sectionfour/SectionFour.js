import React from "react";
import "./SectionFour.css";
import trade_icon from "../../../Assets/Images/Maskgroup2.png";
import Video from "../../../Assets/transparent_1.gif";
import video1 from "../../../Assets/video1.gif"
function SectionFour() {
  return (
    <div>
      <div className="container">
        <div className="row  d-flex align-items-center mt-5">
          <div className="col-lg-6 col-md-12 d-flex justify-content-center ">
            <div>
              {/* <img
                src={Video}
                width={"750px"}
                className=" img-fluid pic_animation"
                alt=""
              /> */}
                <img
                src={video1}
                width={"750px"}
                className=" img-fluid pic_animation"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-center">
            <div className="row d-flex justify-content-center">
              <div className="col-12 ">
                <div className="tablet_responsive">
                  <div className="text_trade-anything">Trade Anything</div>
                  <div className="text_no">
                    {" "}
                    <b>No Registration</b>
                  </div>
                  <div className="text_trade-anything">No Hassle</div>
                </div>
                <div className="text-dammy ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut.
                </div>
              </div>
              <div className="col-lg-12 col-md-12 d-flex flex-row bd sectionTwo_responsive mt-2">
                <div class="mb-3">
                  <div className=" align-items-center text_amount">
                    <button className=" d-flex justify-content-start align-items-center btn_trade_bg">
                      <div className="btn_trade_icon_bg p-2">
                        <img
                          src={trade_icon}
                          className="img-fluid"
                          alt=""
                          width={"30px"}
                        />
                      </div>
                      <div className="btn_trade text-center ">Trade Now</div>
                    </button>
                  </div>
                </div>
                <div class="ms-3">
                  <div className="  align-items-center text_amount ">
                    <button className="btn_lear_bg">LEARN MORE</button>
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

export default SectionFour;
