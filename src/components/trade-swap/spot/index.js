import React from "react";
import "./Spot.css";
import TradeNavbar from "../Navbar/TradeNavbar";
import SpotHeader from "./SpotHeader";
import SpotChart from "./SpotChart";
import OpenSpot from "./OpenSpot";

function index() {
  return (
    <>
      <TradeNavbar />
      
      <SpotChart />
      <OpenSpot />
    </>
  );
}

export default index;
