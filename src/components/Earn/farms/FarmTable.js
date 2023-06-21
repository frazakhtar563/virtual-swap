import React, { useState } from "react";
import coinIcon from "../../../Assets/Images/Group5.png";
import calculatorIcon from "../../../Assets/Images/calculator.png";
import questionIcon from "../../../Assets/Images/Group6.png";
// import ArrowDownIcon from "../../../Assets/Images/ArrowDown.png";
import Accordion from "react-bootstrap/Accordion";
import { CgArrowTopRightR } from "react-icons/cg";
import { FaFileContract } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { walletConnection } from "../../../Redux/userWalletSlice/userWalletSlice";
import EnableModal from "./EnableModal";

function FarmTable() {
  let { userWallet, isWalletConnected } = useSelector((state) => state.connect);
  const data = [
    {
      earn: "0",
      apr: "20.21",
      discount: "upto 13.89%",
      liquidity: "$980,9783",
      multiplier: "40x",
      eventKey: "0",
    },
    {
      earn: "0",
      apr: "20.21",
      discount: "upto 13.89%",
      liquidity: "$980,9783",
      multiplier: "40x",
      eventKey: "1",
    },
    {
      earn: "0",
      apr: "20.21",
      discount: "upto 13.89%",
      liquidity: "$980,9783",
      multiplier: "40x",
      eventKey: "2",
    },
    {
      earn: "0",
      apr: "20.21",
      discount: "upto 13.89%",
      liquidity: "$980,9783",
      multiplier: "40x",
      eventKey: "3",
    },
  ];
  const [showEnable, setShowEnable] = useState(false);
const handleShowEnable = () => setShowEnable(true);
  const [enable,setEnable] = useState(false);
  const dispatch = useDispatch()
  const connectWallet = () => {
    dispatch(walletConnection());
  };
  return (
    <>
    <div className="container">
      {" "}
      <div className="row mb-5">
        <div className="col-12">
          <div className="row">
            <Accordion flush className="m-1">
              
              {data.map((data) => {
              
                return (
                  <>
                  <div className="">
                    <Accordion.Item eventKey={data.eventKey} className="px-3">
                      <Accordion.Header>
                        <div className="col-md-12 mt-3 mb-3 accrodion_responsive">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-6">
                              <img
                                src={coinIcon}
                                className="img-fluid"
                                alt=""
                                width={"40px"}
                              />
                              <span className="text-white"> VS-BNB</span>
                            </div>
                            <div className="col-md-2 col-6 d-flex">
                              <button className="btn-core">Core</button>
                              <button className=" btn-boosted ms-2">
                                Boosted
                              </button>
                            </div>
                            <div className="col-md-1 col-3 ms-2">
                              <div className="text-accordion">Earned</div>
                              <div className="text-white">{data.earn}</div>
                            </div>
                            <div className="col-lg-3 d-flex">
                              <div className="d-block">
                              <div className="text-accordion">APR</div>
                             
                              <del className="text-white"> {data.apr}</del>
                              </div>
                              {/* <img
                                src={calculatorIcon}
                                className="img-fluid ms-3"
                                alt=""
                                width={"30px"}
                              /> */}
                             
                              <span className="tdiscount ms-5">
                                &nbsp; {data.discount}
                              </span>
                            </div>
                            <div className="col-md-2 col-6">
                              <div className="text-accordion">Liquidity</div>
                              <div className="text-white">
                                {data.liquidity}&nbsp;
                                <img
                                  src={questionIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={"20px"}
                                />
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="text-accordion">Multiplier</div>
                              <div className="text-white">
                                {data.multiplier}&nbsp;
                                <img
                                  src={questionIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={"15px"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                          <div className="col-md-4 col-5 ">
                            <div className="row d-flex align-items-center">
                              <div className="p-2 text_virtualEarnedUp">
                                Get Virtual-BNB LP <CgArrowTopRightR />
                              </div>
                              <div className="p-2 text_virtualEarnedUp">
                                See Pair Info <CgArrowTopRightR />
                              </div>
                              <div className="p-2 text_virtualEarnedUp">
                                View Contract <FaFileContract />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8 col-12 ">
                            <div className="row d-flex justify-content-between">
                              <div className="col-4">
                                <div className="row">
                                  {/* <div className=" d-flex justify-content-between align-items-center">
                                    <div className="">
                                      <h4 className="text_virtualEarned">
                                        Virtual Earned
                                      </h4>
                                      <p className="text_virtualEarnedUp">
                                        0.0000
                                      </p>
                                    </div>
                                    <div>
                                      <button
                                        className="btn btn_Farm ms-4"
                                        type="button"
                                      >
                                        Harvest
                                      </button>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                              {/* <div className="col-5 mt-3">
                                <div className="m-2">
                                  <h4 className="text_virtualEarned">
                                    YIELD BOOSTER
                                  </h4>
                                  <p className="text_virtualEarnedUp">
                                    Up to 2x &nbsp; &nbsp;
                                    <span>
                                      <img
                                        src={questionIcon}
                                        className="img-fluid"
                                        alt=""
                                        width={"20px"}
                                      />
                                    </span>
                                  </p>
                                  <p className="text_virtualEarned m-0 p-0">
                                    Connect wallet to activate yield booster
                                  </p>
                                </div>
                              </div> */}
                             {!isWalletConnected&& <div className="col-12 farming_box mt-3 mb-3">
                                <h5 className="m-2 text-white">Start Farming</h5>
                                <div className="d-grid gap-2 mb-3">
                                  <button
                                    className="btn btn_Farm"
                                    type="button"
                                    onClick={()=>{connectWallet()}}
                                  >
                                    Connect Wallet
                                  </button>
                                </div>

                                <div></div>
                              </div>}
                             
                            { isWalletConnected &&  <div className="col-12 farming_box mt-3 mb-3">
                                <h5 className="m-2 text-white">Enable Farm</h5>
                                <div className="d-grid gap-2 mb-3">
                                  <button
                                    className="btn btn_Farm"
                                    type="button"
                                    onClick={handleShowEnable}
                                  >
                                    Enable
                                  </button>
                                </div>
                                <EnableModal
                        show={showEnable}
                        onHide={() => setShowEnable(false)}
                      />
                             
                              </div>
                                }
                            </div>
                
                          </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    </div>
                  </>
                );
              })}
              
            </Accordion>
           
          </div>
          {/* <div className="table">
            <table className="table" style={{ width: "100%" }}>
              {data.map((data) => {
                return (
                  <>
                    <tr className="table-heading">
                      <th></th>
                      <th></th>
                      <th>Earn</th>
                      <th>APR</th>
                      <th>Liquidity</th>
                      <th>Multiplier</th>
                      <th></th>
                    </tr>

                    <tr className="table-row">
                      <td className="text-center">
                        <img
                          src={coinIcon}
                          className="img-fluid"
                          alt=""
                          width={"40px"}
                        />
                        <span> VS-BNB</span>
                      </td>
                      <td className="">
                        <button className="btn-core">Core</button>
                        <button className=" ms-2 btn-boosted">Boosted</button>
                      </td>
                      <td>{data.earn}</td>
                      <td>
                        <img
                          src={calculatorIcon}
                          className="img-fluid"
                          alt=""
                          width={"40px"}
                        />
                        &nbsp;&nbsp;
                        <del> {data.apr}</del>
                        <span className="tdiscount">
                          &nbsp; {data.discount}
                        </span>
                      </td>
                      <td>
                        {data.liquidity}&nbsp;
                        <img
                          src={questionIcon}
                          className="img-fluid"
                          alt=""
                          width={"30px"}
                        />
                      </td>
                      <td>
                        {data.multiplier}&nbsp;
                        <img
                          src={questionIcon}
                          className="img-fluid"
                          alt=""
                          width={"30px"}
                        />
                      </td>
                      <td>
                        <img
                          src={ArrowDownIcon}
                          className="img-fluid"
                          alt=""
                          width={"30px"}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div> */}
        </div>
      </div>
    </div>
    </>
  );
}

export default FarmTable;
