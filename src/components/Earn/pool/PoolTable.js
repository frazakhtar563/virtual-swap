import React from "react";
import coinIcon from "../../../Assets/Images/Group5.png";
import calculatorIcon from "../../../Assets/Images/calculator.png";
import questionIcon from "../../../Assets/Images/Group6.png";
// import ArrowDownIcon from "../../../Assets/Images/ArrowDown.png";
import Accordion from "react-bootstrap/Accordion";
import { CgArrowTopRightR } from "react-icons/cg";
import { FaFileContract } from "react-icons/fa";
function PoolTable() {
  const data = [
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "0",
    },
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "1",
    },
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "3",
    },
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "4",
    },
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "5",
    },
    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "6",
    },

    {
      cakeStaked: "0.0",
      flexibleAPY: "20.21",
      lockedAPR: "Up to 20.21%",
      totalstaked: "980,9783",
      eventKey: "7",
    },
  ];
  return (
    <div className="container">
      <div className="row mt-1 mb-5">
        <div className="col-12">
          <div className="row">
            <Accordion flush className="m-2">
              {data.map((data) => {
                return (
                  <>
                    <Accordion.Item eventKey={data.eventKey} className="respons_table px-3">
                      <Accordion.Header>
                        <div className="col-md-12 mb-3 px-3">
                          <div className=" d-flex justify-content-between align-items-center ">
                            <div className=" d-flex">
                              <img
                                src={coinIcon}
                                className="img-fluid"
                                alt=""
                                width={"40px"}
                              />
                              <span>VS-BNB</span>
                            </div>
                            <div className="d-flex">
                              <button className="btn-core">Core</button>
                              <button className="ms-2 btn-boosted">
                                Boosted
                              </button>
                            </div>
                            <div className=" ms-2">
                              <div className="text-accordion">Cake Staked</div>
                              <div>{data.cakeStaked}</div>
                            </div>
                            <div className="ms-3">
                              <div className="text-accordion">Flexible APY</div>
                              <img
                                src={calculatorIcon}
                                className="img-fluid"
                                alt=""
                                width={"30px"}
                              />
                              &nbsp;&nbsp;
                              <del> {data.flexibleAPY}</del>
                              <span className="tdiscount">
                                &nbsp; {data.discount}
                              </span>
                            </div>
                            <div className="ms-3">
                              <div className="text-accordion">Locked APR</div>
                              <div>
                                {data.lockedAPR}&nbsp;
                                <img
                                  src={questionIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={"20px"}
                                />
                              </div>
                            </div>
                            <div className="ms-3">
                              <div className="text-accordion">Total Staked</div>
                              <div>
                                {data.totalstaked}&nbsp;
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
                      <Accordion.Body className="">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="col-lg-6 col-12 d-flex">
                            <div className="row m-2">
                              <div className="d-flex gap-2 text_Pool_total">
                                <h6>Total locked:</h6>
                                <p>Total locked:</p>
                              </div>
                              <div className="d-flex ap-2 text_Pool_total">
                                <h6>Average lock duration:</h6>
                                <p>Total locked:</p>
                              </div>
                              <div className="d-flex gap-2 text_Pool_total">
                                <h6>Performance Fee</h6>
                                <p>Total locked:</p>
                              </div>
                            </div>
                            <div className="row d-flex align-items-center m-2">
                              <div className="p-2 text_virtualEarnedUp">
                                Get Virtual-BNB LP <CgArrowTopRightR />
                              </div>
                              <div className="p-2 text_virtualEarnedUp">
                                See Pair Info <CgArrowTopRightR />
                              </div>
                              <div className="p-2 text_virtualEarnedUp">
                                View Contract <FaFileContract />
                              </div>
                              <div className="d-grid gap-2 mb-3">
                                <button className="btn btn_Farm" type="button">
                                  Auto /Locked
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-12 ">
                            <div className="row d-flex justify-content-between">
                              <div
                                className="col-12 farming_box  mt-3"
                                style={{ height: "100px" }}
                              >
                                <div className="row m-2 mt-3 ">
                                  <div className=" d-flex justify-content-between align-items-center">
                                    <div className="">
                                      <h4 className="text_virtualEarned text-white">
                                        Recent Virtual Profit
                                      </h4>
                                      <p className="text_virtualEarnedUp">0</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="col-12 farming_box mt-3 mb-3"
                                style={{ height: "100px" }}
                              >
                                <h5 className="m-2 text-white">Start Staking</h5>
                                <div className="d-grid gap-2 mb-3">
                                  <button
                                    className="btn btn_Farm"
                                    type="button"
                                  >
                                    Connect Wallet
                                  </button>
                                </div>

                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
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
  );
}

export default PoolTable;
