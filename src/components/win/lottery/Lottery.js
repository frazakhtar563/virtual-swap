import React from "react";
import WinNavbar from "../W_Navbar";
import Finished from "./Finished";
import HowToPlay from "./HowToPlay";
import "./Lottery.css";
import LotteryTicket from "./LotteryTicket";
import PrizeFunds from "./PrizeFunds";
import StillQuestion from "./StillQuestion";
import Wining from "./Wining";

function Lottery() {
  return (
    <>
      <div className="lottery-bg">
        <WinNavbar />
        <LotteryTicket />
      </div>
      {/* <Finished /> */}
       <HowToPlay />
     {/* <Wining /> */}
       {/* <PrizeFunds /> */}
      {/*<StillQuestion /> */}
    </>
  );
}

export default Lottery;
