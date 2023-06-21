import React, { useEffect } from "react";
import "./referral.css";
import FaceIcon from "../../Assets/Images/uu3.png";
import connection_icon from "../../Assets/Images/connection_icon.png";
import connection_icon_blue from "../../Assets/Images/conection_icon_blue.png";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions";

function Ref_Invite() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  console.log("acc", acc);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  useEffect(() => {}, [acc]);
  return (
    <div className="ref_bg">
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-12 mt-5">
            <h3 className="t-claim-howTo mt-5">How to invite friends</h3>
            <div className="row mt-5 mb-5">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="invite-box">
                  <div className="row d-flex justify-content-center m-5">
                    <div className="text-center">
                      <img
                        src={FaceIcon}
                        className="img-fluid"
                        alt=""
                        width={"50px"}
                      />
                      <h3 className="t-ref-get">1. Get an invitation link</h3>
                      <p className="t-ref-connect">
                        Connect your wallet and generate your invitation links
                        in the invitation section.
                      </p>
                    </div>
                    <div className="d-flex  justify-content-center align-items-center text_amount mt-3 ">
                      <button
                        className=" d-flex justify-content-start align-items-center btn_connect_bg"
                        onClick={connectWallet}
                      >
                        <div className="btn_connect_icon_bg p-2">
                          <img
                            src={connection_icon}
                            className="img-fluid "
                            alt=""
                          />
                        </div>
                        <div className=" btn_connection_wallet">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <div className="invite-box2">
                  <div className="row d-flex justify-content-center m-5">
                    <div className="text-center">
                      <img
                        src={FaceIcon}
                        className="img-fluid"
                        alt=""
                        width={"50px"}
                      />
                      <h3 className="t-ref-invite">2. Invite friends</h3>
                      <p className="t-ref-connect">
                        Refer your friends to Pandora and receive bonuses from
                        their earnings
                      </p>
                    </div>
                    <div className="d-flex  justify-content-center align-items-center text_amount mt-3 ">
                      <button
                        className=" d-flex justify-content-start align-items-center btn_ref_connect_bg"
                        onClick={connectWallet}
                      >
                        <div className="btn_ref_connect_icon_bg p-2">
                          <img
                            src={connection_icon_blue}
                            alt=""
                            className="img-fluid btn_ref_"
                          />
                        </div>
                        <div className=" btn_ref_connection_wallet">
                          {acc === "No Wallet"
                            ? "Connect Wallet"
                            : acc === "Connect Wallet"
                            ? "Connect Wallet"
                            : acc === "Wrong Network"
                            ? acc
                            : acc.substring(0, 3) +
                              "..." +
                              acc.substring(acc.length - 3)}{" "}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ref_Invite;
