import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiFillSetting } from "react-icons/ai";
import SwitchForm from "./SwitchForm";
const SettingModal = (props) => {
  const [settingActive,setSettingActive] = useState("one");
  const modalSetting = (setActive) => {
    setSettingActive(setActive);
  }
  return (
    <div>
      <Modal
        show={props.show}
        onHide={() => props.onHide()}
        animation={false}
        // className="main_modal"
        size="md"
        centered
      >
        <div className="">
        <Modal.Header closeButton>
          <Modal.Title className="set_text">Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="row justify-content-between d-flex">
            <h5 className="text-primary">GLOBAL</h5>
            <div className="col-md-12 col-12">
              <div className="d-flex">
                <h5 className="mt-3 sett_font">Light Mode</h5>
                <div className="form-check form-switch switch ms-auto p-0">
                  <input
                    className="form-check-input change ms-auto text-end light_mode"
                    onClick={() => props.toggleThem()}
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <h5 className="mt-3 sett_font">Subgraph Health Indicator</h5>
             <SwitchForm className="ms-auto text-end"/>
              </div>
              <div className="d-flex justify-content-between">
                <h5 className="mt-3 sett_font">Subgraph Health Indicator</h5>
             <SwitchForm className="ms-auto text-end"/>
              </div>
              <div className="d-flex justify-content-between">
                <h5 className="mt-3 sett_font">Subgraph Health Indicator</h5>
             <SwitchForm className="ms-auto text-end"/>
              </div>
              <div className="d-flex">
                <h5 className="mt-3 sett_font">Default Transaction Speed (GWEI)</h5>
              </div>
              <div className="d-flex w-100 justify-content-between mt-2 mb-3">
              <button className={settingActive == "one" ?"setting_btn activeModal":"setting_btn"} onClick={()=>modalSetting("one")}>Default</button>
                <button className={settingActive == "two" ?"setting_btn activeModal":"setting_btn"}  onClick={()=>modalSetting("two")}>Standard (5)</button>
                <button className={settingActive == "three" ?"setting_btn activeModal":"setting_btn"}  onClick={()=>modalSetting("three")}>Fast (6)</button>
                <button className={settingActive == "four" ?"setting_btn activeModal":"setting_btn"}  onClick={()=>modalSetting("four")}>Instant (7)</button>
                </div>
            </div>
          </div>
        </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
