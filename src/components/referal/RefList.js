import React, { useEffect } from "react";
import connection_icon from "../../Assets/Images/connection_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../Redux/connection/actions";

function Ref_List() {
  const dispatch = useDispatch();
  let acc = useSelector((state) => state.connect?.connection);
  console.log("acc", acc);
  const connectWallet = () => {
    dispatch(connectionAction());
  };
  useEffect(() => {}, [acc]);
  return (
    <div className="container">
      <div className="row d-flex justify-content-center mt-5 mb-5">
        <div className="col-md-12 mt-5">
          <div className="row d-flex align-items-center">
            <div className="col-md-12">
              <div>
                <button className="btn-ref-list">Referral LIst</button>
                <button className="btn-ref-list">Farms</button>
                <button className="btn-ref-list">Pools</button>
                <button className="btn-ref-list">Trade Mining</button>
              </div>
            </div>
            <div className="col-md-12">
              <div className="waitDash-box">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
                    <div className="d-flex  align-items-center text_amount mt-5 ">
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

export default Ref_List;
