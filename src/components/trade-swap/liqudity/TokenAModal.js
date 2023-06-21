import React, { useEffect, useState } from 'react'
import BnbLogo from "../../../Assets/coins/bnb-logo.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenAValues } from "../../../Redux/selectTokenASlice/selectTokenA";
import { nativeCurrency } from '../../../utils';
import tlogo from '../../../Assets/tlogo.png'
import { AiOutlineQuestionCircle, AiOutlineWarning } from 'react-icons/ai';
import { createTokenInstance } from '../../../instances/instances';
import API from '../../.././client';

import ImportTokenModal from './ImportTokenModal';
import axios from 'axios';
import { toast } from 'react-toastify';
const TokenAModal = (props) => {
  let { userWallet, isWalletConnected, networkStatus } = useSelector((state) => state.connect);

  const [show, setShow] = useState(false);
  const [initialDetail, setInitialDetail] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  let { tokenA } = useSelector((state) => state.selectTokenA);
  let { tokenB } = useSelector((state) => state.selectTokenB);
  const [showImport, setShowImport] = useState(false);
  const handleShowTol = () => {
    setIsNewToken(false)
    setShowImport(true)

  };
  const [isUnderstand, setIsUnderStand] = useState('true')

  // let allPairs = [
  //   {
  //     coin: nativeCurrency,
  //     // pic: `BnbLogo`,
  //     address: "",
  //     isImport: true
  //   }, {
  //     coin: "WBNB",
  //     // pic: BnbLogo,
  //     address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  //     isImport: true
  //   },
  //   {
  //     coin: "Arbi",
  //     // pic: BnbLogo,
  //     address: "0xCd39c71F863F1B4A390817ACC7Ea66F9b262767f",
  //     isImport: true
  //   },
  //   {
  //     coin: "Virtual",
  //     // pic: BnbLogo,
  //     address: "0xa718bC2727bEB640E7200d620852cD83140c234C",
  //     isImport: true
  //   },
  //   {
  //     coin: "BL",
  //     pic: '',
  //     address: "0x208F521710620d417E9f35a37f107e360f4A7c3d",

  //   }
  // ]
  let [data, setData] = useState([])
  let [isNewToken, setIsNewToken] = useState(false)

  let [newTokenDetail, setNewTokenDetail] = useState({})
  const filterTokens = async (value) => {
    try {
      let filterData = initialDetail?.filter((item) => {
        return item.coin.toLowerCase().includes(value.toLowerCase()) || item.address.includes(value)
      });
      if (filterData.length > 0) {

        setData(filterData)
      } else {
        setData([])
        let instance = await createTokenInstance(value)
        let tokenSymbol = await instance.methods.symbol().call()
        let tokenName = await instance.methods.name().call()

        setNewTokenDetail({
          coin: tokenSymbol,
          address: value,
          name: tokenName,
        })
        setIsNewToken(true)
      }
    } catch (error) {
      setData([])
      setIsNewToken(false)
      console.error("error while filter token", error);
    }
  }
  let token = []
  const addNewTokenInList = async () => {
    let obj = {}
    obj = {
      name: newTokenDetail.name,
      coin: newTokenDetail.coin,
      address: newTokenDetail.address,
      isImport: true,
    }
    token.push(obj)
    localStorage.setItem("tokenList", JSON.stringify(token));
    dispatch(setTokenAValues(newTokenDetail))
    getdetail()
    setShowImport(false)
    setIsNewToken(false)
    props.onHide()
  }
  const handleModalHide = async () => {
    setShowImport(false)
    setIsNewToken(false)
  }
  const getdetail = async () => {
    await API.post(`getCoinList`,)
      .then(function (response) {
        let res = response.data.data;
        let localeTokenList = localStorage.getItem("tokenList")
        if (localeTokenList != null) {
          setData(res.concat(JSON.parse(localeTokenList)))
          setInitialDetail(res.concat(JSON.parse(localeTokenList)))
        } else {
          setInitialDetail(res)
          setData(res)
        }
      }).catch(function (error) {
        console.log(error);
      });



  }
  console.log('data', data)
  useEffect(() => {

    getdetail()
  }, [isWalletConnected])
  useEffect(() => {
    handleModalHide()
  }, [props.show])
  return (

    <div className='row mt-0'>
      {/* <Button
                      className="bg-dark dropdown-toggle main_btn"
                      variant="primary"
                      onClick={handleShow}
                    >
                      BNB
                    </Button> */}
      <div className='col-lg-5'>
        <Modal className=' margin_none h-100'
          {...props}
          // style={{width:"342px !important"}}
          size="md"
        >

          <Modal.Header closeButton className=''>
            <Modal.Title className="text-center fs-3">
              {showImport ? <>Import Token</> : <>Select a Token</>}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <h5 className="text-center">Specify deposit <span className="fw-100"> TRX </span>amount here:</h5> */}
            <input
              type="text"
              className=" w-100 modal_input mt-1 text-white"
              placeholder="Search name or paste address"
              autoFocus
              onChange={(e) => filterTokens(e.target.value)}
            />

            <p className="mt-2 text-white">Common Bases</p>
            <div className="d-flex w-100 justify-content-center gap-3 mb-2">
              <div className='d-flex bor'>

                <button className="btn btn-success">  <img
                  src={tlogo}
                  className="image-fluid img_coin"
                />
                  <span className='ms-1'>VRC</span>
                </button>
              </div>
              <div className='d-flex bor'>

                <button className="btn btn-success">
                  <img
                    src={tlogo}
                    className="image-fluid img_coin"
                  />
                  <span className='ms-1'>
                    USDT
                  </span>
                </button>
              </div>
              <div className='d-flex bor'>

                <button className="btn btn-success">
                  <img
                    src={tlogo}
                    className="image-fluid img_coin"
                  />
                  <span className='ms-1'>VRC</span>
                </button>
              </div>
              <div className='d-flex bor'>

                <button className="btn btn-success">
                  <img
                    src={tlogo}
                    className="image-fluid img_coin"
                  />
                  <span className='ms-1'>BTCB</span>  </button>
              </div>


            </div>
            {
              isNewToken ?
                <div className='d-flex'>
                  <AiOutlineQuestionCircle className=' mark' />
                  <h5 className='ms-2'>{newTokenDetail?.coin}</h5>
                  <button className='ms-auto text-end import_btn' onClick={handleShowTol}
                    style={{ cursor: "pointer" }}>Import</button>
                </div>
                : showImport ? <>
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
                  <h5>{newTokenDetail?.name}
                    ({newTokenDetail?.coin})</h5>
                  <h5>{`${newTokenDetail.address?.slice(0, 7)}...${newTokenDetail?.address?.slice(newTokenDetail?.address?.length - 5, newTokenDetail?.address?.length)}`}</h5>
                  <a href={`https://testnet.bscscan.com/address/${newTokenDetail?.address}`} target='_blank' className='btn_token'>(View on BscScan)</a>
                  <div className="form-check" >
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => { setIsUnderStand(!isUnderstand) }} />
                    <label className="form-check-label ms-1" for="flexCheckDefault">
                      I Understand
                    </label>
                  </div>
                  <button className='new_import_btn w-100 mt-2' disabled={isUnderstand} onClick={() => { addNewTokenInList() }}>Import</button>
                </> :
                  <div className='overY'>
                    {data.map((item, index) => {
                      console.log("item.iomage", item);
                      return (
                        < >
                          <div className="d-flex mt-1 " key={index} onClick={() => {
                            item.coin == tokenB.coin ? props.onHide() : dispatch(setTokenAValues(item)); props.onHide()
                          }} style={{ cursor: item.coin == tokenB.coin || tokenB.coin == 'BNB' && item.coin == 'WBNB' || item.coin == 'VTT' && tokenB.coin == 'Virtual' ? "no-drop" : "pointer" }}>
                            {
                              item.image_url ?
                                <img
                                  src={BnbLogo}
                                  className="img-fluid mt-2 bnb_img"
                                  alt=""
                                />
                                :
                                <span className='fs-4 text-light'>
                                  <AiOutlineQuestionCircle className='' />
                                </span>
                            }


                            <div className="list ms-2 mt-2 ">
                              <h5 className="mb-0">{item?.coin}</h5>
                              <p className="mb-0 chain">{item.isImport && "Added by user."} {item.name}</p>
                            </div>
                          </div>
                        </>
                      )
                    })}
                  </div>
            }

            {/* <button className='mana_toke'>Manage Tokens</button> */}

          </Modal.Body>

        </Modal>
      </div>
    </div>
  )
}

export default TokenAModal
