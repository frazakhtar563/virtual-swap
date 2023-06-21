import React from "react";
import blue_one from "../../../Assets/Images/Group34.png";
import pink_two from "../../../Assets/Images/Group35.png";
import yellow_three from "../../../Assets/Images/Group36.png";
import blue_four from "../../../Assets/Images/Group37.png";
import conn_icon from "../../../Assets/Images/connection_icon.png";

function IfoHow() {
  return (
    <div className=" header_area how_margin">
      <div className="container ">
        <div className="row d-flex justify-content-center mt-5 mb-5">
          <div className="col-md-12 mt-5">
            <h2 className="text_how_to_take text-center">
              How to Take Part in the Public Sale
            </h2>
          </div>
          <div className="row d-flex justify-content-between mt-5">
            <div className="col-lg-3 col-md-4 col-12 ">
              <div className="how_card1">
                <div className="row">
                  <div className="text-end blue_circle">
                    <img
                      src={blue_one}
                      className="img-fluid "
                      width={"50px"}
                      alt=""
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text_heading_card1">
                      Activate your Profile
                    </h3>
                    <p className="text_para_card1">
                      You’ll need an active PancakeSwap Profile to take part in
                      an IFO!
                    </p>
                  </div>
                </div>
                <div className="text-white btn_sale_bg ">
                  <div className="row m-0 p-0">
                    <div className="col-4 m-0 p-0 d-flex justify-content-center align-items-center btn_sale_icon_bg">
                      <img
                        src={conn_icon}
                        className="img-fluid"
                        width={"20px"}
                        alt=""
                      />
                    </div>
                    <div className="col-8 d-flex justify-content-center align-items-center ">
                      <p
                        className="p-0 m-0"
                        style={{ margin: "auto", fontSize: "13px" }}
                      >
                        Connect Wallet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-12 ">
              <div className="how_card2">
                <div className="row">
                  <div className="text-end blue_circle">
                    <img
                      src={pink_two}
                      className="img-fluid "
                      width={"50px"}
                      alt=""
                    />
                    <div className="p-4">
                      <h3 className="text_heading_card2">
                        Lock CAKE in the CAKE pool
                      </h3>
                      <p className="text_para_card1">
                        You’ll need an active PancakeSwap Profile to take part
                        in an IFO! You’ll need an active PancakeSwap Profile to
                        take part in an IFO!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-12 ">
              <div className="how_card3">
                <div className="row">
                  <div className="text-end blue_circle">
                    <img
                      src={yellow_three}
                      className="img-fluid "
                      width={"50px"}
                      alt=""
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text_heading_card3">Commit CAKE</h3>
                    <p className="text_para_card1">
                      You’ll need an active PancakeSwap Profile to take part in
                      an IFO!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-12 ">
              <div className="how_card4">
                <div className="row">
                  <div className="text-end blue_circle">
                    <img
                      src={blue_four}
                      className="img-fluid "
                      width={"50px"}
                      alt=""
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text_heading_card2">
                      Activate your Profile
                    </h3>
                    <p className="text_para_card1">
                      You’ll need an active PancakeSwap Profile to take part in
                      an IFO!
                    </p>
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

export default IfoHow;
