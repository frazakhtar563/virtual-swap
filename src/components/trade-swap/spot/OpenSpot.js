import React from "react";

function OpenSpot() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-md-12 spot_border">
          <div className="row">
            <div className="mt-3">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link nav-profile-tab"
                    id="nav-order-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-order"
                    type="button"
                    role="tab"
                    aria-controls="nav-order"
                    aria-selected="true"
                  >
                    Open Order
                  </button>
                  <button
                    className="nav-link nav-profile-tab"
                    id="nav-history-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-history"
                    type="button"
                    role="tab"
                    aria-controls="nav-history"
                    aria-selected="true"
                  >
                    Order History
                  </button>
                  <button
                    className="nav-link nav-profile-tab"
                    id="nav-trade-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-trade"
                    type="button"
                    role="tab"
                    aria-controls="nav-trade"
                    aria-selected="true"
                  >
                    Trade History
                  </button>
                  <button
                    className="nav-link nav-profile-tab"
                    id="nav-fund-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-fund"
                    type="button"
                    role="tab"
                    aria-controls="nav-fund"
                    aria-selected="true"
                  >
                    Funds
                  </button>
                </div>
              </nav>
              {/*  */}
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-order"
                  role="tabpanel"
                  aria-labelledby="nav-order-tab"
                >
                  <div
                    className="table_spot bg-black"
                    id="style-3"
                    style={{ height: "200px" }}
                  >
                    <table className="table mt-3  ">
                      <tr className=" list-table ">
                        <th className="">Date</th>
                        <th className="">Pair</th>
                        <th className="">Type</th>
                        <th className="">Side</th>
                        <th className="">Price</th>
                        <th className="">Amount</th>
                        <th className="">Filled</th>
                        <th className="">Total</th>
                        <th className="">Trigger Conditions</th>
                        <th className="">Cancel All</th>
                      </tr>
                      {/* {data.map((data) => {
                        return (
                          <>
                            <tr
                              className=" list-table "
                              style={{ color: data.color }}
                            >
                              <td className="m-0 p-0">{data.price}</td>
                              <td className=" text-white">{data.amount}</td>
                              <td className=" text-white">{data.total}</td>
                            </tr>
                          </>
                        );
                      })} */}
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-history"
                  role="tabpanel"
                  aria-labelledby="nav-history-tab"
                >
                  <div className="d-flex gap-3 mt-2 bg-black">
                    <button className="btn_days">1 Day</button>
                    <button className="btn_days">1 Week</button>
                    <button className="btn_days">1 Month</button>
                    <button className="btn_days">3 Month</button>
                    <label className="text_Time">Time</label>
                    <input
                      type="date"
                      id="birthdaytime"
                      name="birthdaytime"
                    ></input>
                    <label className="text_Time">to</label>
                    <input
                      type="date"
                      id="birthdaytime"
                      name="birthdaytime"
                      className="date_input"
                    ></input>
                    <button className="btn_days">Search..</button>
                    <button className="btn_days"> Reset</button>
                  </div>
                  <div
                    className="table_spot bg-black"
                    id="style-3"
                    style={{ height: "200px" }}
                  >
                    <table className="table mt-3">
                      <tr className=" list-table   bg-dark">
                        <th className="">Date</th>
                        <th className="">Pair</th>
                        <th className="">Type</th>
                        <th className="">Side</th>
                        <th className="">Price</th>
                        <th className="">Amount</th>
                        <th className="">Filled</th>
                        <th className="">Total</th>
                        <th className="">Trigger Conditions</th>
                        <th className="">Cancel All</th>
                      </tr>
                      {/* {data.map((data) => {
                        return (
                          <>
                            <tr
                              className=" list-table "
                              style={{ color: data.color }}
                            >
                              <td className="m-0 p-0">{data.price}</td>
                              <td className=" text-white">{data.amount}</td>
                              <td className=" text-white">{data.total}</td>
                            </tr>
                          </>
                        );
                      })} */}
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade show bg-black"
                  id="nav-trade"
                  role="tabpanel"
                  aria-labelledby="nav-trade-tab"
                >
                  <div className="d-flex gap-3 mt-2 bg-black">
                    <button className="btn_days">1 Day</button>
                    <button className="btn_days">1 Week</button>
                    <button className="btn_days">1 Month</button>
                    <button className="btn_days">3 Month</button>
                    <label className="text_Time">Time</label>
                    <input
                      type="date"
                      id="birthdaytime"
                      name="birthdaytime"
                    ></input>
                    <label className="text_Time">to</label>
                    <input
                      type="date"
                      id="birthdaytime"
                      name="birthdaytime"
                      className="date_input"
                    ></input>
                    <button className="btn_days">Search..</button>
                    <button className="btn_days"> Reset</button>
                  </div>
                  <div
                    className="table_spot bg-black"
                    id="style-3"
                    style={{ height: "200px" }}
                  >
                    <table className="table mt-3  ">
                      <tr className=" list-table   bg-dark">
                        <th className="">Date</th>
                        <th className="">Pair</th>
                        <th className="">Side</th>
                        <th className="">Price</th>
                        <th className="">Exceuted</th>
                        <th className="">Fee</th>
                        <th className="">Role</th>
                        <th className="">Total</th>
                      </tr>
                      {/* {data.map((data) => {
                        return (
                          <>
                            <tr
                              className=" list-table "
                              style={{ color: data.color }}
                            >
                              <td className="m-0 p-0">{data.price}</td>
                              <td className=" text-white">{data.amount}</td>
                              <td className=" text-white">{data.total}</td>
                            </tr>
                          </>
                        );
                      })} */}
                    </table>
                  </div>
                </div>
                <div
                  className="tab-pane fade show "
                  id="nav-fund"
                  role="tabpanel"
                  aria-labelledby="nav-fund-tab"
                >
                  <div
                    className="table_spot bg-black"
                    id="style-3"
                    style={{ height: "200px" }}
                  >
                    <table className="table mt-3  ">
                      <tr className=" list-table   bg-dark">
                        <th className="">Coin</th>
                        <th className="">Trade Balance</th>
                        <th className="">Available Balance</th>
                        <th className="">In order</th>
                        <th className="">BTC value</th>
                      </tr>
                      {/* {data.map((data) => {
                        return (
                          <>
                            <tr
                              className=" list-table "
                              style={{ color: data.color }}
                            >
                              <td className="m-0 p-0">{data.price}</td>
                              <td className=" text-white">{data.amount}</td>
                              <td className=" text-white">{data.total}</td>
                            </tr>
                          </>
                        );
                      })} */}
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <div className="row">
                <h4 className="text_login ">
                  <span className="" style={{ color: "#04EBEA" }}>
                    Connect Wallet &nbsp;
                  </span>
                </h4>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenSpot;
