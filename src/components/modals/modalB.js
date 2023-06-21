import React from "react";
import Modal from "react-bootstrap/Modal";
import BnbLogo from "../../Assets/coins/bnb-logo.png";
import "./modal.css";

function ModalB(props) {
  const data = [
    {
      coin: "BNB",
      pic: BnbLogo,
      address: ""
    }, {
      coin: "WBNB",
      pic: BnbLogo,
      address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
    },
    {
      coin: "Arbi",
      pic: BnbLogo,
      address: "0xCd39c71F863F1B4A390817ACC7Ea66F9b262767f"
    },
    {
      coin: "Virtual",
      pic: BnbLogo,
      address: "0xa718bC2727bEB640E7200d620852cD83140c234C"
    }
  ];
  return (
    <>
      <Modal
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
        {...props}
      >
        <Modal.Header className="modal_bg" closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Token Lists
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="">
              <input
                type="text"
                className="form-control bg-dark"
                placeholder="Search..."
                style={{ width: "100%" }}
              />
            </div>
            <div className="mt-4">
              <h5>Token Pairs</h5>
            </div>
            <div className="mt-2 gap-2 coin_overflow">
              {data.map((coins, index) => {
                return (
                  <>
                    <div key={index} style={{ cursor: "pointer" }}
                      onClick={() => {
                        props.setTokenB({
                          coin: coins.coin,
                          pic: coins.pic,
                          address: coins.address
                        })
                        props.onHide()
                      }}>
                      <p className="text_coin">
                        <img
                          src={coins.pic}
                          className="img-fluid"
                          width={"30px"}
                          alt=""
                        />
                        &nbsp;
                        <span className="text-white">{coins.coin}</span>
                      </p>
                      {/* <img
                        src={coins.pic}
                        className="img-fluid"
                        width={"20px"}
                        alt=""
                      > */}

                      {/* </img> */}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalB;
