import React from "react";

function LotteryTicket() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="row d-flex justify-content-around align-items-center">
            <div className="col-md-6">
              <div className="row">
                <div className="LT-box">
                  <div className="m-2">The Virtual Swap Bond</div>
                </div >
                <div className="t-Lt">$98,0897</div>
                <div className="t-InPrize">in Prize</div>
                <div className="mt-3 button_responsive">
                  <button className="btn-BuyTicket">Buy Tickets</button>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-10 LT-box2">
              <div className="mb-3">
                <div className="row d-flex justify-content-center mt-3">
                  <div className="col-xl-8 col-md-7  "><div className="t-Get">Get Your Tickets Now!</div></div>
                  <div className="col-xl-4 col-md-5">
                    <div className="LT-time-box">
                      <div className="">1D 6H 8M</div>
                    </div>
                    <div className="t-until">Until The Draw</div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-11">
                    <div>
                      <label className="t-NextDraw">Next Draw</label>
                      <div className="T-input">
                        <div className="text-center ">
                          <div className="TDraw p-2">
                            #743 | Draw: Dec 9, 2022, 4:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="T-input mt-2">
                      <div className="d-flex justify-content-between">
                        <div className="t-PrizePot">Prize Pot</div>
                        <div className="t-Dollar">~$97,439</div>
                      </div>
                    </div>
                    <div className="T-input mt-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="t-PrizePot">Prize Pot</div>
                        <div className="t-Dollar">~$97,439</div>
                      </div>
                    </div>
                    <div className="mt-3 mb-3">
                      <button className="LT-circle">Detail</button>
                    </div>
                  </div>

                </div>
                <div className="row">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LotteryTicket;
