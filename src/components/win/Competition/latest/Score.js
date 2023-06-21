import React, { useEffect } from "react";
// import "./Latest.css";
import connectICon from "../../../../Assets/Images/connection_icon.png";
import facePicture from "../../../../Assets/Images/Win/uu16.png";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../../../Redux/connection/actions";

function Score() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  console.log("acc", acc);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  useEffect(() => {}, [acc]);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 ">
          <div className="Latest-box">
            <div className="row d-flex justify-content-center">
              <div className="title-box">Your Score</div>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
             
                <div className="t-check text-center">check your rank</div>
                <div className="t-connect-view  text-center">
                  Connect wallet to view
                </div>
                <div className="text-center mt-3">
                    <button className="button_connect">Connect Wallet</button>
                  </div>
              </div>
              {/* <div className="col-4">
                <div className="text-center d-xl-none">
                  <img
                    src={facePicture}
                    className="img-fluid "
                    alt=""
                    // width={"180px"}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
     
  );
}

export default Score;
