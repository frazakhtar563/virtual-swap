import React from "react";
import Tradebar from "./Tradebar";
import "./trade.css";
import Tradeleaderboard from "./Tradeleaderboard";
import Tradetimebomb from "./Tradetimebomb";
import TradeFaq from "./TradeFaq";
import Tradeleague from "./Tradeleague";

function index() {
  return (
    <>
    <Tradeleague/>
      <Tradebar />
      <Tradeleaderboard />
      <Tradetimebomb />
      <TradeFaq />
    </>
  );
}

export default index;
