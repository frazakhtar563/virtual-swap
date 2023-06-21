import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function IfoNavbar() {
  const [iscolor, setIsColor] = useState("Latest");
  const { pathname } = useLocation();
  const changePath = () => {
    if (pathname) {
      console.log("pathname", pathname);
      if (pathname == "/ifo_latest") {
        setIsColor("Latest");
      } else if (pathname == "/Win_prediction") {
        setIsColor("Prediction");
      } else if (pathname == "/ifo_finished") {
        setIsColor("Finished");
      }
    }
  };

  useEffect(() => {
    changePath();
  });
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 d-flex justify-content-center Navbar-border nav-hover">
          <Link
            className={
              iscolor == "Latest"
                ? "nav-Nlink-active  p-3"
                : "nav-Nlink W_Navbar p-3"
            }
            id="Latest"
            onClick={() => setIsColor("Latest")}
            to="/ifo_latest"
          >
            Latest
          </Link>
          <Link
            className={
              iscolor == "Finished"
                ? "nav-Nlink-active  p-3"
                : "nav-Nlink W_Navbar p-3"
            }
            id="Finished"
            onClick={() => setIsColor("Finished")}
            to="/ifo_finished"
          >
            Finished
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IfoNavbar;
