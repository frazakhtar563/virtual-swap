import React from "react";
import CompetitionNavbar from "../CompetitionNavbar";
import Latest from "./Latest";
import PrizeByTeam from "./PrizeByTeam";
import Rules from "./Rules";
import Score from "./Score";
import TopRate from "./TopRate";

function index() {
  return (
    <>
      <div className="W_bg">
        <CompetitionNavbar />
        <Latest />
      </div>
      <Score />
      <TopRate />
      <PrizeByTeam />
      <Rules />
    </>
  );
}

export default index;
