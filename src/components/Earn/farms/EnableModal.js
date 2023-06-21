import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BsBoxArrowUpRight } from "react-icons/bs";

const EnableModal = (props) => {
  return (
    <div>
      <div>
        <Modal
          show={props.show}
          onHide={() => props.onHide()}
          animation={false}
          // className="main_modal"
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="set_text fw-bold">
              Stake LP Tokens
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className="p-3 new_group mt-1 rounded"
              style={{ backgroundColor: "none !important" }}
            >
              <div className="col-md-12 col-12 d-flex">
                <p className="col-md-6 col-6 text-white">Stake</p>
                <span className="col-md-6 text-white col-6 text-end ms-auto">
                  Balance:0.0
                </span>
              </div>

              <div className="col-md-11 d-flex">
                <input
                  type="text"
                  className="col-md-7 col-7 pad height_inp border-0 outline-0 p-0"
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  placeholder="0.0"
                  //   onChange={(e) => { handleChangeA(e) }}
                />
                <span className="col-md-4 text-white col-4 text-end ms-3 mt-1">
                  Cake-BUSD LP
                </span>
              </div>
              <p className="text-white mb-0">-0.00</p>
            </div>
            <p className="text-danger fw-bold mt-1">
              No Token to stake: Get Cake BUSD-LP
            </p>
            <div className="d-flex">
              <div className="col-md-12 text-white d-flex mt-1">
                <p className="col-md-8 col-8">Annual ROI at Current Rates</p>
                <p className="col-md-4 col-4 text-end fw-bold">$0.00</p>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-between mt-2">
              <div className="col-md-6 text-center">
                <button className="btn btn_enab" onClick={()=>{props.onHide()}}>Cancel</button>
              </div>
              <div className="col-md-6 text-center">
                <button className="btn btn_enab_2">Confirm</button>
              </div>
            </div>
            <div className="col-md-12 mt-5 d-flex text-center justify-content-center">
              <p className="enab_text mt-4 text-center" style={{cursor:"pointer"}}>Get CAKE-BUSD LP </p>
              <BsBoxArrowUpRight className="enab_icon mt-4 ms-2 fw-bold"/>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EnableModal;
