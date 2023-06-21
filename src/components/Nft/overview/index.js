import React from "react";
import NftNavbar from "../NftNavbar";
import OverView from "./OverView";
import "./OverView.css";
import Newest from "./Newest";
import HotCollection from "./HotCollection";
import NewestArrival from "./NewestArrival";
import NftFaq from "./NftFaq";

function index() {
  return (
    <>
      <div className="Over_bg">
        <NftNavbar />
        <OverView />
      </div>
      <Newest />
      <HotCollection />
      <NewestArrival />
      <NftFaq />
    </>
  );
}

export default index;
