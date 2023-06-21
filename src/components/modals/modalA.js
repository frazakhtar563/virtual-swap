import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import BnbLogo from "../../Assets/coins/bnb-logo.png";
import "./modal.css";
import wbnb from "../../instances/abis/wbnb.json"
import { createTokenInstance } from "../../instances/instances"
import { nativeCurrency } from "../../utils";
function ModalA(props) {
    let [filter, setfilter] = useState("");
    const lowercasedFilter = filter.toLowerCase();
    let [data, setData] = useState([
        {
            coin: nativeCurrency,
            pic: BnbLogo,
            address: "",
            isImport: true
        }, {
            coin: "WBNB",
            pic: BnbLogo,
            address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            isImport: true
        },
        {
            coin: "Arbi",
            pic: BnbLogo,
            address: "0xCd39c71F863F1B4A390817ACC7Ea66F9b262767f",
            isImport: true
        },
        {
            coin: "Virtual",
            pic: BnbLogo,
            address: "0xa718bC2727bEB640E7200d620852cD83140c234C",
            isImport: true
        }
    ].filter(item => {
        return Object.keys(item).some(key =>
            item[key].toLowerCase().includes(lowercasedFilter)
        );
    }))
    const handleChange = event => {
        setfilter(event.target.value);
    };
    const getToken = async (address) => {
        try {

            // let contract = await createTokenInstance(address);
            // let symbol = await contract.methods.symbol().call();
            // setData([{
            //     coin: symbol,
            //     address: address,
            //     pic: BnbLogo,
            //     isImport: false
            // }])

            // console.log("contract...", symbol);
        } catch (error) {
            console.error("error while get token", error);
        }
    }
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
                                onChange={(e) => { handleChange(e) }}
                                type="text"
                                className="form-control"
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
                                    <div className="d-flex justify-content-between" key={index}>
                                        <div style={{ cursor: "pointer" }} onClick={() => {
                                            props.setTokenA(
                                                {
                                                    coin: coins.coin,
                                                    pic: coins.pic,
                                                    address: coins.address
                                                }
                                            )
                                            props.onHide()
                                        }}
                                        >
                                            <p className="text_coin">
                                                <img
                                                    src={coins.pic}
                                                    className="img-fluid"
                                                    width={"30px"}
                                                    alt=""
                                                />
                                                &nbsp;
                                                <span>{coins.coin}</span>
                                            </p>

                                        </div>
                                        {
                                            !coins.isImport && <div>helle</div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalA;
