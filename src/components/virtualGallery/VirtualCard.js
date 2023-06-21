import React from "react";
import Blue from "../../Assets/Images/Group25.png";
import Pink from "../../Assets/Images/Group26.png";
import Yellow from "../../Assets/Images/Group27.png";
import BnbIcon from "../../Assets/Images/BnbIcon.png";
import Picture from "../../Assets/Images/virtualGallery.png";

function VirtualCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <div className="row d-flex justify-content-between mt-5">
            <div className="col-lg-4 col-md-4 mt-3">
              <div className="virtual-card-1">
                <div className="virtual-innerCard">
                  <div className="d-flex justify-content-between">
                    <div>
                      <img
                        src={Blue}
                        className="img-fluid"
                        width={"74px"}
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column p-3">
                      <div className="t-moon1">Moon pets</div>
                      <div className="t-N-Vol">
                        Volume &nbsp;
                        <img
                          src={BnbIcon}
                          className="img-fluid"
                          width={"14px"}
                          alt=""
                        />{" "}
                        &nbsp;&nbsp; 298
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <img src={Picture} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4  mt-3">
              <div className="virtual-card-2">
                <div className="virtual-innerCard2">
                  <div className="d-flex justify-content-between">
                    <div>
                      <img
                        src={Pink}
                        className="img-fluid"
                        width={"74px"}
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column p-3">
                      <div className="t-moon2">Moon pets</div>
                      <div className="t-N-Vol">
                        Volume &nbsp;
                        <img
                          src={BnbIcon}
                          className="img-fluid"
                          width={"14px"}
                          alt=""
                        />{" "}
                        &nbsp;&nbsp; 298
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <img src={Picture} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4    mt-3">
              <div className="virtual-card-3">
                <div className="virtual-innerCard3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <img
                        src={Yellow}
                        className="img-fluid"
                        width={"74px"}
                        alt=""
                      />
                    </div>
                    <div className="d-flex flex-column p-3">
                      <div className="t-moon3">Moon pets</div>
                      <div className="t-N-Vol">
                        Volume &nbsp;
                        <img
                          alt=""
                          src={BnbIcon}
                          className="img-fluid"
                          width={"14px"}
                        />{" "}
                        &nbsp;&nbsp; 298
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <img src={Picture} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="t-viewAll mt-5">View All</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualCard;
