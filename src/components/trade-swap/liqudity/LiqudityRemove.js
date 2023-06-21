import React, { useEffect, useState, useMemo } from "react";
// import "./Trade_Swap.css";
import coin from "../../../Assets/Images/bnb-logo.png";
import signalIcon from "../../../Assets/Images/SignalIcon.png";
import SettingICon from "../../../Assets/Images/MaskSetting.png";
import Ticon from "../../../Assets/Images/TimeIcon.png";
import RecycleIcon from "../../../Assets/Images/Recycle.png";
import ExchangeIcon from "../../../Assets/Images/Exchange.png";
import CopyIcon from "../../../Assets/Images/Copy.png";
import connection_icon from "../../../Assets/Images/connection_icon.png";
// import "../../App.css";
import ModalA from "../../modals/modalA";
import ModalB from "../../modals/modalB";
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HashLink } from "react-router-hash-link";
import {
  routerContractRef,
  WBNBContractRef,
  factoryContractRef,
  createTokenInstance,
  createPairInstance,
} from "../../../instances/instances";
import { useSelector, useDispatch } from "react-redux";
import { connectionAction } from "../../../Redux/connection/actions";
import { nativeCurrency, walletShortFormer } from "../../../utils";
import { fromWei, toWei, userWalletBal } from "../../../constants";
import {
  virtualRouterAddress,
  wbnbAddress,
  arbiTokenAddress, virtualTokenAddress,
  factoryContractAddress,
} from "../../../instances/addresses";
import Slider from "react-rangeslider";
import { AiOutlineArrowDown, AiOutlinePlus } from 'react-icons/ai';

import { toast } from "react-toastify";
import { AiOutlineWarning } from "react-icons/ai";
import { Button } from "bootstrap";
import { getDataOfPair, getFilterPairOfData } from "../../../Redux/userLiquidity/userLiquidityDataSlice";
import { useParams } from "react-router-dom";
import NeedHelp from '../../../Assets/NeedHelp.png'
function LiqudityRemove() {


  const { pairAddressData, isPairAddressData, isUserLiquidityFound, userLiquidityInfo } = useSelector((state) => state.userLiquidityInfo);
  let { pairAddress } = useParams();
  const [rateFromAtoB, setrateFromAtoB] = useState();
  const [rateFromBtoA, setrateFromBtoA] = useState();
  const [disabled, setDisable] = useState(true);
  const [methodForLiquidity, setmethodForLiquidity] = useState(true);
  const [checkBoxOne, setCheckBoxOne] = useState(true);
  const [checkBoxZero, setCheckBoxZero] = useState(true);
  const [btnText, setbtnText] = useState("Detail");
  const [value, setValue] = useState(0);
  const [isTrnsiction, setIsTransiction] = useState(false);

  const [errorMessage, seterrorMessage] = useState({
    isRemove: true
  });
  const [simpleMode, setSimpleMode] = useState({
    lpBalanceSimple: 0,
    tokenZeroBalance: 0,
    tokenOneBalance: 0
  });
  const [tokenOneBalance, settokenOneBalance] = useState(0);
  const [tokenZeroBalance, settokenZeroBalance] = useState(0);
  const [userinfo, setUserInfo] = useState({
    tokenZeroBalance: 0,
    tokenOneBalance: 0,
    tokenZeroSymbol: '',
    tokenOneSymbol: '',
    rateFromAtoB: "",
    rateFromBtoA: "",
    lpBalance: 0,
    shareInTradingPool: 0
  });

  let { userWallet, isWalletConnected, networkStatus } = useSelector((state) => state.connect);
  let userInfoss = useSelector((state) => state.connect);
  let userInformation = JSON.parse(localStorage.getItem('userInfo'))
  console.log('userInformation', userInformation)
  const dispatch = useDispatch();
  const connectWallet = () => {
    dispatch(connectionAction());
  };

  useEffect(() => {
    const myfun = () => {
      if (isWalletConnected && networkStatus) {
        if (isUserLiquidityFound) {
          userLiquidityInfo.filter((liquidity) => {
            if (liquidity.pairAddress === pairAddress) {
              dispatch(getFilterPairOfData(liquidity))
            }
          })
        } else {
          let obj = {
            pairAddress,
            userWallet
          }
          dispatch(getDataOfPair(obj))
        }
      }
    };
    myfun();
  }, [userWallet,]);
  // useEffect(() => {

  //   setUserInfo(
  //     {
  //       tokenZeroBalance: 0,
  //       tokenOneBalance: 0,
  //       tokenZeroSymbol: userInformation.symbol0,
  //       tokenOneSymbol: userInformation.symbol1,
  //       rateFromAtoB: userInformation.rateFromAtoB,
  //       rateFromBtoA: userInformation.rateFromBtoA,
  //       lpBalance: userInformation.lpBalance,
  //       shareInTradingPool: userInformation.shareInTradingPair,
  //       percentageZero: 50,
  //       percentageOne: 50,
  //       lpBalanceSimple: ''
  //     }
  //   )
  //   settokenOneBalance(userInformation.tokenOneBalance)
  //   settokenZeroBalance(userInformation.tokenZeroBalance)

  // }, []);

  // const handlecheckbox = async (e) => {
  //   console.log('event', e)
  //   let tokenZero_1Percent = Number(userInformation.tokenZeroBalance) / 100
  //   let tokenOne_1Percent = Number(userInformation.tokenOneBalance) / 100
  //   if (e.target.name == 'check0' && e.target.checked == false) {
  //     setUserInfo(
  //       {
  //         ...userinfo,
  //         tokenZeroBalance: 0,
  //         tokenOneBalance: Number(tokenOne_1Percent * value) * 2,
  //         percentageOne: 100,
  //         percentageZero: 0,

  //       }
  //     )
  //   }
  //   else if (e.target.name == 'check0' && e.target.checked == true) {
  //     setUserInfo(
  //       {
  //         ...userinfo,
  //         tokenZeroBalance: (Number(tokenZero_1Percent * value)).toFixed(5),
  //         tokenOneBalance: (Number(tokenOne_1Percent * value)).toFixed(5),
  //         percentageOne: 50,
  //         percentageZero: 50,


  //       }
  //     )
  //   }
  //   else if (e.target.name == 'check1' && e.target.checked == false) {
  //     setUserInfo(
  //       {
  //         ...userinfo,
  //         tokenZeroBalance: (Number(tokenZero_1Percent * value) * 2).toFixed(5),
  //         tokenOneBalance: 0,
  //         percentageZero: 100,
  //         percentageOne: 0,


  //       }
  //     )
  //   }
  //   else if (e.target.name == 'check1' && e.target.checked == true) {
  //     setUserInfo(
  //       {
  //         ...userinfo,
  //         tokenZeroBalance: (Number(tokenZero_1Percent * value)).toFixed(5),
  //         tokenOneBalance: (Number(tokenOne_1Percent * value)).toFixed(5),
  //         percentageZero: 50,
  //         percentageOne: 50,


  //       }
  //     )
  //   }
  //   // else if (e.target.name == 'check0' && e.target.checked == false) {
  //   //   setUserInfo(
  //   //     {
  //   //       ...userinfo,
  //   //       tokenZeroBalance: Number(tokenZero_1Percent * value) * 2,
  //   //       tokenOneBalance: 0,

  //   //     }
  //   //   )

  //   // }
  // }
  // useEffect(() => {
  //   handleChange()


  // }, [checkBoxOne, checkBoxZero]);

  const handleChangeStart = () => {
    console.log("Change event started");
  };

  const handleChange = (value) => {
    let tokenZero_1Percent = Number(pairAddressData.token0Pooled) / 100
    let tokenOne_1Percent = Number(pairAddressData.token1Pooled) / 100
    let lpBalanceInPercent = Number(pairAddressData.liquidity * value) / 100


    if (value !== "Max") {

      let result0 = (Number(value) * tokenZero_1Percent)
      let result1 = (Number(value) * tokenOne_1Percent)
      setSimpleMode({ ...simpleMode, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent })
      setUserInfo({ ...userinfo, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent, })

      setValue(value);
    } else {
      let result0 = (Number(pairAddressData.token0Pooled))
      let result1 = (Number(pairAddressData.token0Pooled))
      setSimpleMode({ ...simpleMode, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: Number(pairAddressData.liquidity) })

      setUserInfo({ ...userinfo, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: Number(pairAddressData.liquidity), tokenOneBalance: result1, tokenZeroBalance: result0 })

      setValue(100);
    }
    seterrorMessage({ ...errorMessage, isDisable: false, lpBalanceErrorMessage: "" })

  };

  const handleChangeComplete = () => {
    console.log("Change event completed");
  };
  const changeLiquidityMethod = async () => {
    if (methodForLiquidity == true) {
      setmethodForLiquidity(false)
      setbtnText('Simple')
    }
    else {
      setmethodForLiquidity(true)
      setbtnText('Detail')
    }
  }
  const handleSimpleMode = async (e) => {
    console.log('condation', Number(e.target.value) > Number(pairAddressData.liquidity))
    console.log('value', e.target.value)

    let tokenZero_1Percent = Number(pairAddressData.token0Pooled) / 100
    let tokenOne_1Percent = Number(pairAddressData.token1Pooled) / 100
    let lpBalanceInPercent = Number(pairAddressData.liquidity * value) / 100
    let barPercent;
    if (e.target.name == 'lpBalanceSimple') {
      barPercent = Number((e.target.value) / pairAddressData.liquidity) * 100
      setValue(Number(barPercent))
      let result0 = (Number(barPercent) * tokenZero_1Percent)
      let result1 = (Number(barPercent) * tokenOne_1Percent)
      setSimpleMode({ ...simpleMode, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: Number(e.target.value) })

      setUserInfo({ ...userinfo, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent, tokenOneBalance: result1, tokenZeroBalance: result0 })


    }
    else if (e.target.name == 'tokenZeroBalance') {
      barPercent = Number((e.target.value) / pairAddressData.token0Pooled) * 100
      setValue(Number(barPercent))
      let result0 = (Number(barPercent) * tokenZero_1Percent)
      let result1 = (Number(barPercent) * tokenOne_1Percent)
      setSimpleMode({ ...simpleMode, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent, tokenZeroBalance: Number(e.target.value) })

      setUserInfo({ ...userinfo, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent, tokenOneBalance: result1, tokenZeroBalance: result0 })
    }
    else if (e.target.name == 'tokenOneBalance') {
      barPercent = Number((e.target.value) / pairAddressData.token1Pooled) * 100
      setValue(Number(barPercent))
      let result0 = (Number(barPercent) * tokenZero_1Percent)
      let result1 = (Number(barPercent) * tokenOne_1Percent)
      setSimpleMode({ ...simpleMode, tokenZeroBalance: result0, lpBalanceSimple: lpBalanceInPercent, tokenOneBalance: Number(e.target.value) })

      setUserInfo({ ...userinfo, tokenZeroBalance: result0, tokenOneBalance: result1, lpBalanceSimple: lpBalanceInPercent, tokenOneBalance: result1, tokenZeroBalance: result0 })
    }
    if (Number(e.target.value) > Number(pairAddressData.liquidity)) {
      seterrorMessage({ ...errorMessage, isDisable: true, lpBalanceErrorMessage: "limit exceed" })
    }
    else {
      seterrorMessage({ ...errorMessage, isDisable: false, lpBalanceErrorMessage: "" })

    }

  }
  const approveLiquidity = async () => {
    // let factory = await factoryContractRef()
    // let pairAddress = await factory.methods.getPair(wbnbAddress, virtualTokenAddress).call()
    try {

      let pairContract = await createPairInstance(pairAddressData.pairAddress)

      const approveHash = await pairContract.methods.approve(virtualRouterAddress, toWei(simpleMode.lpBalanceSimple * 2)).send({
        from: userWallet
      })
      toast.success('Approved')
      seterrorMessage({ ...errorMessage, isRemove: false })
    } catch (error) {
      console.log('error apporve', error.message)
    }

  }
  const removeLiquidity = async () => {
    try {
      setIsTransiction(true)
      if (isWalletConnected && networkStatus) {
        const routerContract = await routerContractRef();
        console.log('tooen address', userInformation)
        let obj = {
          pairAddress,
          userWallet
        }
        if (pairAddressData.token0Symbol === nativeCurrency) {
          console.log(nativeCurrency)
          await routerContract.methods.removeLiquidityETH(
            pairAddressData.token1Address,
            toWei(simpleMode.lpBalanceSimple),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300

          ).send(
            { from: userWallet }
          )

          dispatch(getDataOfPair(obj))

          toast.success('Liquidity Removed')
          setValue(0)
          seterrorMessage({ ...errorMessage, isRemove: true })
        }
        else if (pairAddressData.token1Symbol === nativeCurrency) {
          console.log('élseif')
          await routerContract.methods.removeLiquidityETH(
            pairAddressData.token0Address,
            toWei(simpleMode.lpBalanceSimple),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300

          ).send(
            { from: userWallet }
          )

          dispatch(getDataOfPair(obj))
          toast.success('Liquidity Removed')
          setValue(0)
          seterrorMessage({ ...errorMessage, isRemove: true })

        }
        else {
          console.log('else')
          await routerContract.methods.removeLiquidity(
            pairAddressData.token0Address,
            pairAddressData.token1Address,
            toWei(simpleMode.lpBalanceSimple),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300

          ).send(
            { from: userWallet }
          )

          dispatch(getDataOfPair(obj))
          toast.success('Liquidity Removed')
          setIsTransiction(false)

          setValue(0)
          seterrorMessage({ ...errorMessage, isRemove: true })

        }
      }
      setIsTransiction(false)

    } catch (error) {
      setIsTransiction(false)

      console.log('error', error.message)
    }


  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center mb-5 ">
        <div className="col-md-12 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 responsive-swap2">
              <div className="swap-bg p-3">
                <HashLink to="/trade_liqudity" className="text-white text_btn">
                  <IoMdArrowRoundBack className="fs-4 text-start" style={{ cursor: "pointer" }} />
                </HashLink>
                {/* <div className="row d-flex justify-content-between margin-swap">
                  <div className="col-md-12">
                    <div className="row d-flex justify-content-between">
                      <div className="col-2">
                        <div className="ellispe-two">
                          <div className=" d-flex justify-content-center signal-icon">
                            <img
                              src={signalIcon}
                              className="img-fluid"
                              alt=""
                              width={"16px"}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="d-flex justify-content-between">
                          <div className="ellispe-two">
                            <div className=" d-flex justify-content-center signal-icon">
                              <img
                                src={SettingICon}
                                className="img-fluid"
                                alt=""
                                width={"18px"}
                              />
                            </div>
                          </div>
                          <div className="ellispe-two">
                            <div className=" d-flex justify-content-center signal-icon">
                              <img
                                src={Ticon}
                                className="img-fluid"
                                alt=""
                                width={"18px"}
                              />
                            </div>
                          </div>
                          <div className="ellispe-two">
                            <div className=" d-flex justify-content-center signal-icon">
                              <img
                                src={RecycleIcon}
                                className="img-fluid"
                                alt=""
                                width={"18px"}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="row d-flex-justify-content-center mt-2  ">
                  <div className="col-md-12">
                    <div className="text-start text-white tYour">Remove Liqudity ({pairAddressData?.token0Symbol}-{pairAddressData?.token1Symbol})</div>
                    <div className=" text_trade_token">
                      Trade tokens in an instant
                    </div>
                    {/* Condition */}
                    {/* <div className="error_bg mt-3">
                      <p className="ps-2"> <span><AiOutlineWarning/></span>You are the first liquidity provider.</p>
                      <p className="ps-2">The ratio of tokens you add will set the price of this pair.</p>
                      <p className="ps-2">Once you are happy with the rate click supply to review.</p>
                    </div> */}
                  </div>
                </div>
                <div className="d-flex justify-content-between px-3">
                  <p className="text-white">Amount</p>
                  <span className="text-white text-decoration-none" onClick={() => { changeLiquidityMethod() }}>{btnText}</span>
                </div>
                {
                  methodForLiquidity ?
                    <>
                      <p className="text-white ps-3">{value}%</p>
                      <div className="px-3">
                        <Slider
                          min={0}
                          max={100}
                          value={value}
                          onChangeStart={handleChangeStart}
                          onChange={handleChange}
                          onChangeComplete={handleChangeComplete}
                        />
                      </div>
                      {[25, 50, 75, "Max"].map((item) => {
                        return (
                          <button
                            className="text-white input_btn mx-2"
                            onClick={() => {
                              handleChange(item);
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                      <div className=" px-3 mt-3">
                        <p className="text-white"> Recieve</p>
                        <div className="border p-3 rounded-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div>
                              {/* <span>
                                <input type="checkbox" name='check0' defaultChecked={true} onChange={(event) => handlecheckbox(event)}></input>
                              </span> */}
                              <span className=" text-white">{pairAddressData?.token0Symbol}</span>
                            </div>
                            <div className="text-white">
                              <b>{Number(pairAddressData?.token0Pooled).toFixed(8)}</b>({userinfo?.percentageZero}%)
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>
                              {/* <span>
                                <input type="checkbox" name='check1' defaultChecked={true} onChange={(event) => handlecheckbox(event)} ></input>
                              </span> */}
                              <span className=" text-white">{pairAddressData?.token1Symbol}</span>
                            </div>
                            <div className="text-white text-end">
                              <b>{Number(pairAddressData?.token1Pooled).toFixed(8)}</b>({userinfo?.percentageOne}%)
                              {/* <p className="text-primary mb-0">Recieve WBNB</p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    : <>
                      <div className=" px-3 mt-2 d-flex justify-content-between">
                        <p className="text-white"> {pairAddressData?.token0Symbol}:{pairAddressData?.token1Symbol}</p>

                        <p className="text-white">
                          {" "}
                          <span>Balance: {pairAddressData?.liquidity}</span>
                        </p>
                      </div>
                      <div className=" mb-2 px-3 ">
                        {/* <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span> */}

                        <input
                          type="text"
                          className="form-control form-control2"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                          value={simpleMode?.lpBalanceSimple}
                          placeholder="0.0"
                          name="lpBalanceSimple"
                          onChange={(e) => { handleSimpleMode(e) }}
                        />
                      </div>
                      <div className="text-danger">
                        {errorMessage?.lpBalanceErrorMessage}
                      </div>
                      <div className="text-center mb-3 fs-4">
                        <AiOutlineArrowDown className="text-white" />

                      </div>
                      <div className=" mb-2 px-3 ">
                        {/* <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span> */}
                        <p className="mb-0 text-white">{pairAddressData?.token0Symbol}</p>

                        <input
                          type="text"
                          className="form-control form-control2"
                          id="basic-url"
                          name="tokenZeroBalance"
                          aria-describedby="basic-addon3"
                          value={simpleMode?.tokenZeroBalance}
                          placeholder="0.0"
                          onChange={(e) => { handleSimpleMode(e) }}
                        />
                      </div>
                      <div className="text-center mb-3 fs-4">
                        <AiOutlinePlus className="text-white" />

                      </div>
                      <div className=" mb-2 px-3 ">
                        {/* <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span> */}
                        <p className="mb-0 text-white">{pairAddressData?.token1Symbol}</p>

                        <input
                          type="text"
                          className="form-control form-control2"
                          id="basic-url"
                          name="tokenOneBalance"
                          aria-describedby="basic-addon3"
                          value={simpleMode?.tokenOneBalance}
                          placeholder="0.0"
                          onChange={(e) => { handleSimpleMode(e) }}
                        />
                      </div>
                    </>
                }



                <div className=" px-3 mt-3">
                  <p className="text-white"> Price</p>
                  <div className="border p-3 rounded-4">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <span className=" text-white">1 {pairAddressData?.token0Symbol}=</span>
                      </div>
                      <div className="text-white">
                        <b>{Number(pairAddressData?.rateFromAtoB).toFixed(10)} {pairAddressData?.token1Symbol}</b>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <span className=" text-white">1 {pairAddressData?.token1Symbol}=</span>
                      </div>
                      <div className="text-white text-end">
                        <b>{Number(pairAddressData?.rateFromBtoA).toFixed(5)} {pairAddressData?.token0Symbol}</b>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className=" px-3 mt-3 d-flex justify-content-between">
                  <p className="text-primary"> Slippage Tolerance</p>
                  <p className="text-white"> <b>0.05%</b></p>

                </div> */}
                <div className=" mt-3 mb-3 d-flex justify-content-around">

                  <button
                    className="text-white border-0 fs-5 px-5 py-2 rounded-4"
                    style={{ backgroundColor: "#00d1ff" }}
                    disabled={errorMessage?.isDisable || value == 0}
                    onClick={approveLiquidity}

                  >
                    {" "}
                    Enable
                  </button>

                  <button
                    className="text-white border-0 fs-5 px-5 rounded-4"
                    style={{ backgroundColor: "#00d1ff" }}
                    disabled={errorMessage.isRemove || isTrnsiction}
                    onClick={removeLiquidity}

                  >
                    {" "}
                    Remove
                  </button>
                </div>

                {/* <div className="row d-flex justify-content-center mt-2 responsive-swap-input">
                  <div className="col-md-10">
                    <label htmlFor="basic-url" className="form-label">
                      <div className="dropdown">
                        <button
                          className="btn  btn-drop dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() => setShowModalA(true)}
                        >
                          {tokenA.coin}
                        </button>
                        <ModalA
                          show={showModalA}
                          setTokenA={setTokenA}
                          onHide={() => setShowModalA(false)}
                        />
                      </div>
                    </label>
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control2"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        value={valueA}
                        placeholder="0.0"
                        onChange={(e)=>{setValueA(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>
                <div className="row me-4">
                  <div className="d-flex justify-content-end me-5 exchange-responsive">
                    <img
                      src={ExchangeIcon}
                      className="img-fluid exchangeIcon "
                      alt=""
                    />
                  </div>
                </div>
                <div className="row d-flex justify-content-center  responsive-swap-input">
                  <div className="col-md-10">
                    <label htmlFor="basic-url" className="form-label">
                      <div className="dropdown">
                        <button
                          className="btn  btn-drop dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() => setShowModalB(true)}
                        >
                          {tokenB.coin}
                        </button>
                        <ModalB
                        setTokenB={setTokenB}
                          show={showModalB}
                          onHide={() => setShowModalB(false)}
                        />
                      </div>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span>
                      <input
                        type="number"
                        className="form-control form-control2"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        value={valueB}
                        placeholder="0.0"
                        onChange={(e)=>{setValueB(e.target.value)}}
                      />
                    </div>
                  </div>
                </div>
                <div className="row me-4">
                  <div className="d-flex justify-content-end ">
                    <div className="copy-bg text-center CopyIcon">
                      <img
                        src={CopyIcon}
                        className="img-fluid p-2"
                        width={"40px"}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center responsive-swap-Tsnack">
                  <div className="col-md-10 d-flex justify-content-between ">
                    <div className="tsnack">Snack Risk?</div>
                    <div className="tslippage">
                      Slippage Tolerance{" "}
                      <span className="tslippagevalue"> 0.5</span>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center mt-3">
                  <div className="col-lg-3 col-10">
                    <div className="d-flex justify-content-center align-items-center">
                      {isWalletConnected ?
                      <button className="d-flex justify-content-start align-items-center btn_conn_bg" onClick={addLiqudity}>
                      <div className="btn_conn_icon_bg p-3 text-white">
                        <img
                          src={connection_icon}
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className=" btn_conn ms-1" >Add Liquidity</div>
                    </button>
                    :
                      <button className="d-flex justify-content-start align-items-center btn_conn_bg" onClick={connectWallet}>
                        <div className="btn_conn_icon_bg p-3 text-white">
                          <img
                            src={connection_icon}
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className=" btn_conn ms-1" >{isWalletConnected ?<span   id="wallet_address" >{ walletShortFormer(userWallet)}</span>:"Connect Wallet"}</div>
                      </button>}
                    </div>
                  </div>
                </div> */}
              </div>
              {isWalletConnected && <div className="swap-bg mt-3">
                <div className=" p-3 rounded-4">
                  <p className="text-white "> LP tokens in your wallet</p>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className=" text-white">
                        {pairAddressData?.token0Symbol}-{pairAddressData?.token1Symbol} LP:
                      </span>
                    </div>
                    <div className="text-white">
                      <b>{Number(pairAddressData?.liquidity).toFixed(7)}</b>
                      <p className="mb-0 text-muted text-end">(8.257 USD)</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className=" text-white">
                        Share in Trading Pair:
                      </span>
                    </div>
                    <div className="text-white">
                      <b>{Number(pairAddressData?.shareInPool).toFixed(2)}%</b>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className=" text-white">Pooled {pairAddressData?.token0Symbol}:</span>
                    </div>
                    <div className="text-white text-end">
                      <b>{Number(pairAddressData?.token0Pooled).toFixed(8)} </b>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <span className=" text-white">Pooled {pairAddressData?.token1Symbol}:</span>
                    </div>
                    <div className="text-white text-end mb-4">
                      <b>{Number(pairAddressData?.token1Pooled).toFixed(8)}</b>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
      </div>
      <button className="text-start bg-transparent border-0 mb-5 need_help_btn">
        <img
          src={NeedHelp}
          className="img-fluid need_help"
        />
      </button>

    </div>
  );
}

export default LiqudityRemove;
