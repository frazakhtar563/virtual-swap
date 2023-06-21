import React from "react";
import Finished from "./Finished";
import "./Finished.css";
import MoonPets from "./MoonPets";
import IfoNavbar from "../IfoNavbar";

function index() {
  return (
    <>
      <IfoNavbar />
      <Finished />
      <MoonPets />
    </>
  );
}

export default index;
