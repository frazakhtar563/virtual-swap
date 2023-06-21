import React from "react";
import "./Spot.css";
import { MdDetails } from "react-icons/md";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdOutlinePermDeviceInformation } from "react-icons/md";
import { Link } from "react-router-dom";

function SpotHeader() {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="spot_border">
          <div className="d-flex justify-content-between align-items-center m-1">
            <div className="col-lg-2  col-md-4 btc_border">
              <div className="text_Btc">BTC/USDT</div>
              <div className="text_bitcon ">
                <MdDetails /> Bitcoin Detail
              </div>
            </div>
            <div className="col-lg-10 col-md-3">
              <div className="d-block d-lg-flex justify-content-between align-items-center spot_value_mbolie">
                <div className="d-flex gap-2 align-items-center">
                  <h6 className="text_change">LAST:</h6>
                  <h6 className="spot_value text-success">0.06535276</h6>
                  {/* <p className="text_spotPrice m-0 p-0">$20,825.22</p> */}
                </div>
              
                <div className="spot_mobile d-flex gap-2 align-items-center">
                  <h6 className="text_change">24hHigh:</h6>
                  {/* <p className="text_price m-0 p-0">$20,825.22</p> */}
                  <h6 className="spot_value text-success">0.06535276</h6>
                </div>
                <div className="spot_mobile d-flex gap-2 align-items-center">
                  <h6 className="text_change">24h Low:</h6>
                  <h6 className="spot_value text-success">0.06535276</h6>
                  {/* <p className="text_price m-0 p-0">$20,825.22</p> */}
                </div>
                <div className="spot_mobile gap-2 d-flex align-items-center">
                  <h6 className="text_change">24V:</h6>
                  <h6 className="spot_value text-success">0.06 BTC</h6>
                  {/* <p className="text_price m-0 p-0">$20,825.22</p> */}
                </div>
            
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-6 border_spot_tutorial">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-white">
                  <Link className="text_spot_tutorial">
                    <MdSlowMotionVideo /> &nbsp; Spot Tutorial
                  </Link>
                </div>
                <div className="text-white">
                  <Link className="text_spot_tutorial">
                    <MdOutlinePermDeviceInformation />
                    &nbsp; Spot Guidance
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotHeader;
