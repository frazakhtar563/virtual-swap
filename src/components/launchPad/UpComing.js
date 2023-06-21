import React from "react";
import Blue from "../../Assets/Images/Group25.png";
import ComingSoon from "../../Assets/Images/Group38.png";
import ComingSoon2 from "../../Assets/Images/Group39.png";
import Pink from "../../Assets/Images/Group26.png";
import Picture from "../../Assets/Images/launchPad.png";

function UpComing() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 mt-2">
          <div className=" mb-2">
            <h2 className="text_coming">Upcoming (2)</h2>
          </div>
          <div className="row d-flex justify-content-around mt-2">
            <div className="col-lg-5 col-md-12  mt-5">
              <div className="launchPad_card">
                <div className="launchPad_innerCard">
                  <div className=" d-flex justify-content-between">
                    <div>
                      <img
                        src={Blue}
                        className="img-fluid"
                        width={"121px"}
                        alt=""
                      />
                    </div>
                    <div className="me-3 pic_coming">
                      <img
                        src={ComingSoon}
                        className="img-fluid"
                        alt=""
                        width={"128px"}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="text_virtual_Moon2">Moon pets</h2>
                      <div className="d-flex justify-content-around gap-2">
                        <button className="btn_coming">comning soon</button>
                        <button className="btn_coming">comning soon</button>
                        <button className="btn_coming">comning soon</button>
                      </div>
                      <div className="d-flex justify-content-around gap-2 mt-2">
                        <div className="text_tba">Total Raise</div>
                        <div className="text_tba">TBA</div>
                        <div className="text_tba">Rate</div>
                        <div className="text_tba">TBA</div>
                      </div>
                    </div>
                    <div className="">
                      <img src={Picture} className="img-fluid card_img" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12  mt-5">
              <div className="launchPad_card2">
                <div className="launchPad_innerCard2">
                  <div className=" d-flex justify-content-between">
                    <div>
                      <img
                        src={Pink}
                        className="img-fluid"
                        width={"121px"}
                        alt=""
                      />
                    </div>
                    <div className="me-3 pic_coming">
                      <img
                        src={ComingSoon2}
                        className="img-fluid"
                        alt=""
                        width={"128px"}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="">
                      <h2 className="text_virtual_Moon">Moon pets</h2>
                      <div className="d-flex justify-content-around gap-2">
                        <button className="btn_coming">comning soon</button>
                        <button className="btn_coming">comning soon</button>
                        <button className="btn_coming">comning soon</button>
                      </div>
                      <div className="d-flex justify-content-around gap-2 mt-2">
                        <div className="text_tba">Total Raise</div>
                        <div className="text_tba">TBA</div>
                        <div className="text_tba">Rate</div>
                        <div className="text_tba">TBA</div>
                      </div>
                    </div>
                    <div className="">
                      <img src={Picture} className="img-fluid card_img" alt="" />
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

export default UpComing;
