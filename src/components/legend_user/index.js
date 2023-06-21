import React from "react";
import "./legend.css";
import Legenduser from "./Legenduser";
import LegendRect from "./LegendRect";
import LegendRound from "./LegendRound";
import Legendtimeline from "./Legendtimeline";
import LegendLuckydraw from "./LegendLuckydraw";
import LegendTop from "./LegendTop";
import LegendTopcard from "./LegendTopcard";
import LegendHowLearn from "./LegendHowLearn";

function LengendMain() {
  return (
    <>
      <Legenduser />
      <LegendRect />
      <Legendtimeline />
      <LegendRound />
      <LegendLuckydraw/>
      <LegendTop/>
      <LegendTopcard/>
      <LegendHowLearn/>
    </>
  );
}

export default LengendMain;
