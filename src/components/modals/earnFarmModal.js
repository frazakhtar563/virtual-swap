import React from "react";
import Modal from "react-bootstrap/Modal";
import BnbLogo from "../../Assets/coins/bnb-logo.png";
import "./modal.css";
import { useState } from "react";
import { createEarnFormInstance } from "../../instances/instances";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fromWei, toWei, } from "../../constants";

const initialValues = {
  lpTokenAddress: "",
  amount: "",
  apr: "",

};
function EarnFormModal(props) {
  const [first, setfirst] = useState();
  let { userWallet, isWalletConnected } = useSelector((state) => state.connect);

  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const registerPool = async (e) => {
    e.preventDefault()
    console.log('values', values)
    console.log('amount', toWei(values.amount))
    let earnForm = await createEarnFormInstance();
    let data = await earnForm.methods.registerPool(values.lpTokenAddress, toWei(values.amount), values.apr).send({
      from: userWallet
    });
    console.log('data', data)

  }

  useEffect(() => {
    // registerPool()
  }, []);

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        {...props}
        centered

      >
        <Modal.Header className="modal_bg" closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Register Pool
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={(e) => registerPool(e)}>
                <div class="form-group">
                  <label htmlFor="lpTokenAddress" className="text-white">LP Token address</label>
                  <input type="text"
                    value={values.lpTokenAddress}
                    onChange={handleInputChange}
                    name="lpTokenAddress"
                    class="form-control" id="lpTokenAddress" aria-describedby="lpTokenAddress" placeholder="Enter Lp Token Address" />
                  {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group my-2">
                  <label htmlFor="amount" className="text-white">Amount</label>
                  <input type="number"
                    value={values.amount}
                    onChange={handleInputChange}
                    name="amount"
                    class="form-control" id="amount" placeholder="Enter Amount" />
                </div>
                <div class="form-group my-2">
                  <label htmlFor="apr" className="text-white">Annual Pesrcentage Rate</label>
                  <input type="text" name='apr'
                    value={values.apr}
                    onChange={handleInputChange}
                    class="form-control" id="apr" placeholder="Enter Annual Perecentage Rate " />
                </div>

                <button type="submit" class="btn btn-primary w-100 mt-2" >Submit</button>
              </form>
            </div>
            <div className="col-md-6 text-white  ">
              <div className="mt-md-3">
                <span className="h6">Lp Token Address</span>: <span>0x20f1234564564612312F11</span>

              </div>
              <div className="mt-md-3">
                <span className="h6">Amount</span>: <span>2000$</span>

              </div> <div className="mt-md-3">
                <span className="h6">Annual Pesrcentage Rate</span>: <span>20%</span>

              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EarnFormModal;
