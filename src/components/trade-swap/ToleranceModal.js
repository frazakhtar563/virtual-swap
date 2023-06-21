import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiFillSetting, AiOutlineQuestionCircle } from 'react-icons/ai'
import { updateSlipageAmount } from '../../Redux/settingSlice/settingSlice';
import { useDispatch } from 'react-redux';
// import SwitchForm from "./SwitchForm";
import SwitchForm from '../Header/SwitchForm';

import { async } from 'q';
const ToleranceModal = (props) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState("one");
  const [tolracneSlip, setTolranceSlip] = useState(0.10)
  const setTolranceValue = (activeStr, value) => {
    setActive(activeStr);
    setTolranceSlip(value)
    dispatch(updateSlipageAmount(value))
  }
  let toleranceValue = [{ name: 'one', value: 0.10 }, { name: 'two', value: 0.50 }, { name: 'three', value: 1.00 }]
  const handleChange = async (e) => {
    setActive('')
    setTolranceSlip(e.target.value)
    dispatch(updateSlipageAmount(e.target.value))

  }
  return (
    <div>
      <Modal show={props.show} onHide={() => props.onHide()} animation={false} size="md" centered >
        <Modal.Header closeButton>
          <Modal.Title className="set_text"><h2>Settings</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='my-3' style={{ fontSize: "12px", color: "#9a6aff", fontWeight: "800" }}>Swaps & Liquidity</div>
          <div className='text-white '>Slippage Tolerance <AiOutlineQuestionCircle className='ms-1' style={{ color: "#b8add2" }} /></div>
          <div className='mt-3 d-flex gap-2' >
            {toleranceValue.map((item, index) => {
              return (

                <button key={item.value} className={active == item.name ? "btn_tole active" : "btn_tole"} onClick={() => setTolranceValue(item.name, item.value)}>{item.value}%</button>
              )
            })}
            <input className='btn_tole inp' type="number" onChange={(e) => { handleChange(e) }} value={tolracneSlip} /> <span className='mt-2 fw-bold' style={{ color: "#1FC7CB" }}>%</span>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <h5 className="mt-3 sett_font">Tx deadline (mins)<AiOutlineQuestionCircle className='ms-1' style={{ color: "#b8add2" }} />
            </h5>
            <input className='btn_tole inputTolerancebottom  ms-auto text-end' value={tolracneSlip} placeholder='35' type="number" />

          </div>

          <div className="d-flex justify-content-between mt-2">
            <h5 className="mt-3 sett_font">Expert Mode <AiOutlineQuestionCircle className='ms-1' style={{ color: "#b8add2" }} />
            </h5>
            <SwitchForm className="ms-auto text-end" />
          </div>
          <div className="d-flex justify-content-between mt-2">
            <h5 className="mt-3 sett_font">Flippy sounds <AiOutlineQuestionCircle className='ms-1' style={{ color: "#b8add2" }} /></h5>
            <SwitchForm className="ms-auto text-end" />
          </div>

        </Modal.Body>

      </Modal>
    </div>
  )
}

export default ToleranceModal



