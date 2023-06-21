import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function InfoNavbar() {
  const [iscolor, setIsColor] = useState("Farms");
  const { pathname } = useLocation();
  const changePath = () => {
    if (pathname) {
      console.log("pathname", pathname);
      if (pathname == "/info_swap") {
        setIsColor("Swap");
      } else if (pathname == "/Info_stableSwap") {
        setIsColor("Stable Swap");
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
              iscolor == "Swap" ? "nav-Nlink-active  p-3" : "nav-Nlink p-3"
            }
            id="Swap"
            onClick={() => setIsColor(" Swap")}
            to="/info_swap"
          >
            Swap
          </Link>
          <Link
            className={
              iscolor == "Stable Swap"
                ? "nav-Nlink-active  p-3"
                : "nav-Nlink p-3"
            }
            id="Stable Swap"
            onClick={() => setIsColor("Stable Swap")}
            to="/Info_stableSwap"
          >
            Stable Swap
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InfoNavbar;
