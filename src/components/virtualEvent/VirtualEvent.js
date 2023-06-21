import React from "react";
import "./virtual.css";
import virtual_pic from "../../Assets/Images/virtual_pic.png";

function VirtualEvent() {
  return (
    <>
      <div className="virtual_bg">
        <div className="container">
          <div className="row d-flex just-content-center ">
            <div className="col-lg-12 col-md-12 mt-5">
              <h1 className="t-hot-event">Hot Event</h1>
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-8 col-md-8  mt-5">
                  <div className="virtual_box">
                    <div className="row">
                      <div className="col-lg-8 col-md-12 col-12 ">
                        <div className="m-5">
                          <div className="t-syrup-storm ">Syrup Storm</div>
                          <div className="t-draw-time">
                            Draw time: Nov 9, 2022 10:59 PM (GMT-8)
                          </div>
                        </div>
                      </div>
                      <div className=" col-lg-4 col-md-4 d-flex justify-content-end ">
                        <img
                          src={virtual_pic}
                          className="virtual_pic"
                          height={"170px"}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VirtualEvent;
