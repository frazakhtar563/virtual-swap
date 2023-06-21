import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineWarning } from "react-icons/ai";
const ImportTokenModal = (props) => {
  const [isUnderstand, setIsUnderStand] = useState('true')
  return (
    <div>
      <Modal show={props.show} onHide={() => props.onHide()} animation={false} size="sm" centered >
        <Modal.Header closeButton>
          <Modal.Title className="set_text">Import Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex border border-warning rounded p-3 text_import'>
            <AiOutlineWarning
              style={{
                color: "yellow",
                width: "157px",
                height: "23px",

              }} />
            <p className='mb-0  text-white '>
              Anyone can create a BEP20 token on Binance Smart Chain Testnet with any name, including creating fake versions of existing tokens and tokens that claim to represent projects that do not have a token.

              If you purchase an arbitrary token, you may be unable to sell it back.
            </p>
          </div>
          <p className='col-md-7 border border-danger p-2 mt-3 text-white rounded'>Unknown Resourse</p>
          <h5>BetterLogics
            (BL)</h5>
          <h5>0x20...7c3d</h5>
          <button className='btn_token'>(View on BscScan)</button>
          <div className="form-check" onClick={() => { setIsUnderStand(!isUnderstand) }}>
            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label ms-1" for="flexCheckDefault">
              I Understand
            </label>
          </div>
          <button className='new_import_btn w-100 mt-2' disabled={isUnderstand} onClick={() => { props.addNewTokenInList() }}>Import</button>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default ImportTokenModal
