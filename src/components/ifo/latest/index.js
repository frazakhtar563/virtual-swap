import React from "react";
import IfoNavbar from "../IfoNavbar";
import IFOFaq from "./IfoFaq";
import IfoHow from "./IfoHow";
import Ifolatest from "./Ifolatest";
import "./Ifo_latest.css";
import IfoSale from "./IfoSale";
function index() {
  return (
    <>
      <div className="header_area">
        <IfoNavbar />
        <Ifolatest />
      </div>
      <IfoSale />
      <IfoHow />
      <IFOFaq />
    </>
  );
}

export default index;
