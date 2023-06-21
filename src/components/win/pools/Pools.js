import React from "react";
import "./Pools.css";
import Picture from "../../../Assets/Images/34445-01.png";
import CoinP from "../../../Assets/Images/Group5.png";
import CoinY from "../../../Assets/Images/Group7.png";
import CoinB from "../../../Assets/Images/Group9.png";
import WinNavbar from "../W_Navbar";

function Pools() {
  return (
    <div className="container">
      <WinNavbar />
      <div className="row ">
        <div className="col-md-12 mt-5 mb-5">
          <div className="row  mt-5 d-flex justify-content-around">
            <div className="col-md-3 pool-card1">
              <div className="pool-circle1">
                <img src={CoinY} className="img-fluid CoinY p-2" alt="" />
              </div>
              <div className="text-white text-center ">
                <img src={Picture} className="" width={"250px"} alt="" />
              </div>
              <div className="tmobox">Mobox Competition</div>
            </div>
            <div className="col-md-3 pool-card2">
              <div className="pool-circle2">
                <img src={CoinP} className="img-fluid CoinY p-2" alt="" />
              </div>
              <div className="text-white text-center ">
                <img src={Picture} className="" width={"250px"} alt="" />
              </div>
              <div className="tmobox2">Mobox Competition</div>
            </div>
            <div className="col-md-3 pool-card3">
              <div className="pool-circle3">
                <img src={CoinB} className="img-fluid CoinY p-2" alt="" />
              </div>
              <div className="text-white text-center">
                <img src={Picture} className="" width={"250px"} alt="" />
              </div>
              <div className="tmobox3">Mobox Competition</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pools;
