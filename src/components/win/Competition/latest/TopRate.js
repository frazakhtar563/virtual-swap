import React from "react";
// import "./Latest.css";
import faceIcon from "../../../../Assets/Images/Win/uu24.png";

function TopRate() {
  const data = [
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
    {
      no: "1",
      amount: "$2,734,120",
      address: "98six...989h",
    },
  ];
  return (
    <div className="T_bg mt-5">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-12">
            <div className="row d-flex justify-content-evenly align-items-center">
              <div className="col-lg-5 col-md-6">
                <div className="d-flex justify-content-around p-2">
                  <div className="t-1box">1</div>
                  <div className="t-volume1">
                    $28,187,929
                    <div className="t-volume">Volume</div>
                  </div>
                  <div className="t-volume1">
                    <span>
                      <img
                        src={faceIcon}
                        className="img-fluid faceIcon"
                        alt=""
                        width={"20px"}
                      />
                    </span>
                    2,230
                    <div className="t-volume">Participants</div>
                  </div>
                </div>
                <div className="d-flex justify-content-around p-2">
                  <div className="t-2box">2</div>
                  <div className="t-volume2">
                    $28,187,929
                    <div className="t-volume">Volume</div>
                  </div>
                  <div className="t-volume2">
                    <span>
                      <img
                        src={faceIcon}
                        className="img-fluid"
                        alt=""
                        width={"20px"}
                      />
                    </span>
                    2,230
                    <div className="t-volume">Participants</div>
                  </div>
                </div>
                <div className="d-flex justify-content-around p-2">
                  <div className="t-3box">3</div>
                  <div className="t-volume3">
                    $28,187,929
                    <div className="t-volume">Volume</div>
                  </div>
                  <div className="t-volume3">
                    <span>
                      <img
                        src={faceIcon}
                        className="img-fluid"
                        alt=""
                        width={"25px"}
                      />
                    </span>
                    2,230
                    <div className="t-volume">Participants</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6   mobile-table-responsive">
                <div className="table_bg">
                  <h3 className="t-topTrades mt-2">Top Traders</h3>
                  <p className="t-since mt-2">Since start of the competition</p>
                  <div className="row d-flex justify-content-center">
                    <div
                      className="btn-groupTop"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button type="button" className="btn-TopRate ">
                        Total
                      </button>
                      <button type="button" className="btn-TopRate">
                        Storm
                      </button>
                      <button type="button" className="btn-TopRate ">
                        Flippers
                      </button>
                      <button type="button" className="btn-TopRate">
                        Swaper
                      </button>
                    </div>
                  </div>
                  <div className="table d-flex justify-content-center">
                    <table
                      className="table text-center"
                      style={{ width: "100%" }}
                    >
                      {data.map((data) => {
                        return (
                          <>
                            <tr className="text-white table-Top">
                              <td colspan="5">{data.no}</td>
                              <td>{data.amount}</td>
                              <td>
                                <img
                                  src={faceIcon}
                                  className="img-fluid"
                                  alt=""
                                  width={"14px"}
                                />
                                {data.address}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </table>
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

export default TopRate;
