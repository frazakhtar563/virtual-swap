import React from "react";

function Proposal() {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 mt-5 mb-5">
          <div className=" p-0 m-0">
            <div className="proposal_bg mt-5 mb-5">
              <div className="row d-flex align-items-center justify-content-md-center  pt-lg-3 pt-md-0  voting_section2_card2_div p-lg-5 p-md-0">
                <div className="col-lg-6 col-sm-12 col-lg-6 text-md-center text-lg-start text-center voting_section2_card2_sub_div pt-md-3 pt-lg-0">
                  <a
                    className="btn btn-primary px-4 mx-2 voting_button_styling border-0"
                    style={{ background: "#FD0093" }}
                    href="#"
                    role="button"
                  >
                    Overview
                  </a>
                  <a
                    className="btn btn-primary px-4 mx-2 voting_button_styling border-0"
                    style={{ background: "#1B1A36" }}
                    href="#"
                    role="button"
                  >
                    Pairs
                  </a>
                  <a
                    className="btn btn-primary px-4 mx-2 voting_button_styling border-0"
                    style={{ background: "#1B1A36" }}
                    href="#"
                    role="button"
                  >
                    Token
                  </a>
                </div>
                <div className="col-lg-6 col-sm-12 col-lg-6 voting_section2_radio_button_div">
                  <ul
                    className="list-unstyled d-flex flex-wrap text-center text-white 
                  justify-content-md-center pt-lg-0 pt-lg-0 pt-md-3 justify-content-lg-end 
                  voting_section2_radio_button_sub_div
                   justify-content-sm-center "
                  >
                    <li className="px-3">
                      <input type="radio" id="radioo" name="radioo" />
                      <label className="ps-2">All</label>
                    </li>
                    <li className="px-3">
                      <input type="radio" id="radioo" name="radioo" />
                      <label className="ps-2">Swap</label>
                    </li>
                    <li className="px-3">
                      <input type="radio" name="radioo" />
                      <label className="ps-2">ADDs</label>
                    </li>
                    <li className="px-3">
                      <input type="radio" name="radioo" />
                      <label className="ps-2">remove</label>
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="d-none  d-md-block " />
              <div className="row">
                <div className="col-12 d-flex flex-wrap voting_noproposal justify-content-center ">
                  <h1 className="text-white text-center">NO PROPOSAL FOUND</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proposal;
