import React, { useEffect } from "react";
import connectICon from "../../../Assets/Images/connection_icon.png";
import "./Lottery.css";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../../Redux/connection/actions";

function Finished() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  console.log("acc", acc);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  useEffect(() => {}, [acc]);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="row button_connect_responsive d-flex justify-content-between ">
            <div className="col-xl-5 col-md-6 col-11">
              <div className="Fininshed-box">
                <div className="row d-flex justify-content-start mt-4">
                  <div className="col-md-11 col-12">
                    <div className="row d-flex justify-content-between">
                      <div className="col-md-5 col-12">
                        <div className="tfinished">Finished Rounds</div>
                      </div>
                      <div className="col-md-7 d-flex justify-content-end ">
                        <div className="btn-group-finished">
                          <button className="btn-finish">All History</button>
                          <button className="btn-finish ">Your History</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="row d-flex justify-content-center mt-5">
                  <div className="input-finished">
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div className="tDrawn">Drawn</div>
                      <div className="tDrawn">Dec 9, 2022, 4:00 AM</div>
                    </div>
                  </div>
                  <div className="col-md-11 input-finished mt-3">
                    <div className="d-flex justify-content-between align-items-center p-3">
                      <div className="tDrawn">Round</div>
                      <div className="tRound">876</div>
                    </div>
                  </div>
                  <div className="col-md-11 mt-3">
                    <div className="d-flex align-items-center ">
                      <div className="tWinning">Winning Number &nbsp;</div>
                      <div className="t-latest-box">Latest</div>
                    </div>
                    <div className="mt-3 mb-3">
                    <button className="LF-circle">Detail</button>
                  </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-md-6  d-flex align-items-center">
              <div className="row d-flex align-items-center">
                <div className="t-connect-your">
                  <b>Connect your wallet to check if you've won!</b>
                </div>
                <div className="button_connect_responsive">
                  <button className="button_connect_pink">
Connect Wallet
                  </button>
                </div>
                {/* <div className="text_amount mt-5">
                  <button
                    className=" d-flex justify-content-start align-items-center btn_Fgird_bg"
                    onClick={connectWallet}
                  >
                    <div className="btn_fgird_icon_bg p-2">
                      <img
                        src={connectICon}
                        className="img-fluid"
                        alt=""
                        width={"30px"}
                      />
                    </div>
                    <div className="btn_Fgird ps-3">
                      {acc === "No Wallet"
                        ? "Connect Wallet"
                        : acc === "Connect Wallet"
                        ? "Connect Wallet"
                        : acc === "Wrong Network"
                        ? acc
                        : acc.substring(0, 3) +
                          "..." +
                          acc.substring(acc.length - 3)}
                    </div>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Finished;
