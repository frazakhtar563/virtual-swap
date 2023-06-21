import React, { useEffect } from "react";
import "./Ifo_latest.css";
import faceIcon from "../../../Assets/Images/uu3.png";
import conn_icon from "../../../Assets/Images/connection_icon.png";
import questionIcon from "../../../Assets/Images/Group33.png";
import { useDispatch, useSelector } from "react-redux";
import { connectionAction } from "../../../Redux/connection/actions";

function IfoSale() {
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
        <div className="col-md-12">
          <div>
            <h3 className="text-sale mt-5">Sale Finished!</h3>
          </div>
          <div className="row d-flex justify-content-center align-items-center mt-5">
            <div className="col-lg-4 col-md-4 col-12 ">
              <div className="sale_card">
                <div className=" circle-question">
                  <img
                    src={questionIcon}
                    className="img-fluid"
                    width={"50px"}
                    alt=""
                  />
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-8 text-center  mt-2">
                    <h3 className="text_sale_token">Token Vesting</h3>
                    <p className="text_sale_you">
                      You have no tokens available for claiming
                    </p>
                    <img
                      src={faceIcon}
                      className="img-fluid"
                      width={"60px"}
                      alt=""
                    />
                    <h4 className="text_sale_youHave">
                      You have no tokens available for claiming
                    </h4>
                    <p className="text_sale_you">
                      Participate in our next IFO. and remember to lock your
                      CAKE to increase your allocation!
                    </p>
                    <p className="sale_link_how text-center">
                      How Does It Work?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-12  d-flex justify-content-center">
              <div className="sale_card_border">
                <div className="row d-flex justify-content-around">
                  <div className="sale_card2">
                    <div className="row flex-row p-4 justify-content-center">
                      <div className="col-8">
                        <p className="p-0 m-0 text_publicSale">Public Sale</p>
                        <p className=" p-0 m-0 text_on_sale">ON SALE</p>
                        <p className=" p-0 m-0 text_sale_value">
                          52,500,000 MGP
                        </p>
                        <p className=" p-0 m-0 text_total_sale">
                          75% of total sale
                        </p>
                      </div>
                      <div className="col-4 pe-0 text-end">
                        <div>
                          <img
                            src={faceIcon}
                            className="img-fluid"
                            width={"60px"}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-around pb-5">
                      <ul className="list-unstyled ">
                        <li>Max. CAKE entry </li>
                        <li> Additional fee</li>
                        <li>Total committed:</li>
                        <li>Max. CAKE entry </li>
                        <li> Additional fee</li>
                        <li>Total committed:</li>
                      </ul>
                      <ul className="list-unstyled">
                        <li>0.000 ~($0)</li>
                        <li> 0.5% </li>
                        <li>$1,312,500</li>
                        <li>0.000 ~($0)</li>
                        <li> 0.5% </li>
                        <li>$1,312,500</li>
                      </ul>
                    </div>
                    <div className="text-white btn_sale_bg p-0 mb-0">
                        <div className="row m-0 p-0">
                        <div className="col-4 m-0 p-0 d-flex justify-content-center align-items-center btn_sale_icon_bg">
                          <img
                            src={conn_icon}
                            className="img-fluid"
                            width={"20px"}
                            alt=""
                          />
                        </div>
                        <div
                          className="col-8 d-flex justify-content-center align-items-center "
                          onClick={connectWallet}
                        >
                          <p
                            className="p-0 m-0"
                            style={{ margin: "auto", fontSize: "14px" }}
                          >
                            {acc === "No Wallet"
                              ? "Connect Wallet"
                              : acc === "Connect Wallet"
                              ? "Connect Wallet"
                              : acc === "Wrong Network"
                              ? acc
                              : acc.substring(0, 3) +
                                "..." +
                                acc.substring(acc.length - 3)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sale_card3">
                    <div className="row flex-row p-4 justify-content-center">
                      <div className="col-8">
                        <p className="p-0 m-0 text_publicSale2">Public Sale</p>
                        <p className=" p-0 m-0 text_on_sale">ON SALE</p>
                        <p className=" p-0 m-0 text_sale_value">
                          52,500,000 MGP
                        </p>
                        <p className=" p-0 m-0 text_total_sale">
                          75% of total sale
                        </p>
                      </div>
                      <div className="col-4 pe-0 text-end">
                        <div>
                          <img
                            src={faceIcon}
                            className="img-fluid"
                            width={"60px"}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex justify-content-around pb-5">
                      <ul className="list-unstyled ">
                        <li>Max. CAKE entry </li>
                        <li> Additional fee</li>
                        <li>Total committed:</li>
                        <li>Max. CAKE entry </li>
                        <li> Additional fee</li>
                        <li>Total committed:</li>
                      </ul>
                      <ul className="list-unstyled">
                        <li>0.000 ~($0)</li>
                        <li> 0.5% </li>
                        <li>$1,312,500</li>
                        <li>0.000 ~($0)</li>
                        <li> 0.5% </li>
                        <li>$1,312,500</li>
                      </ul>
                    </div>
                    <div className="text-white btn_sale_bg ">
                      <div className="row m-0 p-0" onClick={connectWallet}>
                        <div className="col-4 m-0 p-0 d-flex justify-content-center align-items-center btn_sale_icon_bg">
                          <img
                            src={conn_icon}
                            className="img-fluid"
                            width={"20px"}
                            alt=""
                          />
                        </div>
                        <div className="col-8 d-flex justify-content-center align-items-center ">
                          <p className="p-0 m-0" style={{ fontSize: "14px" }}>
                            {acc === "No Wallet"
                              ? "Connect Wallet"
                              : acc === "Connect Wallet"
                              ? "Connect Wallet"
                              : acc === "Wrong Network"
                              ? acc
                              : acc.substring(0, 3) +
                                "..." +
                                acc.substring(acc.length - 3)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" d-flex justify-content-end mt-4">
                  <button className="btn_ifo_Detail">Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IfoSale;
