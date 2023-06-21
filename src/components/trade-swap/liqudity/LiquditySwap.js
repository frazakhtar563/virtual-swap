import React, { useEffect, useState, useMemo } from "react";
// import "./Trade_Swap.css";
import coin from "../../../Assets/Images/bnb-logo.png";
import signalIcon from "../../../Assets/Images/SignalIcon.png";
import SettingICon from "../../../Assets/Images/MaskSetting.png";
import Ticon from "../../../Assets/Images/TimeIcon.png";
import RecycleIcon from "../../../Assets/Images/Recycle.png";
import ExchangeIcon from "../../../Assets/Images/Exchange.png";
import CopyIcon from "../../../Assets/Images/Copy.png";
import { RiQuestionLine } from "react-icons/ri"
import { IoMdArrowRoundBack } from 'react-icons/io'
import { HashLink } from "react-router-hash-link";
import NeedHelp from '../../../Assets/NeedHelp.png'
import {
  routerContractRef,
  WBNBContractRef,
  factoryContractRef,
  createTokenInstance,
  createPairInstance,
} from "../../../instances/instances";
import { useSelector, useDispatch } from "react-redux";
import { walletConnection } from "../../../Redux/userWalletSlice/userWalletSlice";
import { nativeCurrency, walletShortFormer } from "../../../utils";
import { fromWei, toWei, userWalletBal, toPlainString } from "../../../constants";
import {
  virtualRouterAddress
} from "../../../instances/addresses";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getDataOfPair, getFilterPairOfData } from "../../../Redux/userLiquidity/userLiquidityDataSlice";
import Web3 from "web3";
import { AiFillSetting, AiOutlinePlus } from 'react-icons/ai'
import ToleranceModal from "../ToleranceModal";
function LiquditySwap() {
  const { pairAddressData, isPairAddressData, isUserLiquidityFound, userLiquidityInfo } = useSelector((state) => state.userLiquidityInfo);
  console.log("userLiquidityInfo", pairAddressData);
  let { slippageTolerance } = useSelector((state) => state.setting);

  let { pairAddress } = useParams();
  const [valueA, setValueA] = useState();
  const [valueB, setValueB] = useState();
  const [errorMessage, seterrorMessage] = useState({ disable: true, btnText: "Enter Values" });
  const [shareInTradingPair, setShareInTradingPair] = useState(0);
  // states to hold approval status for tokens
  const [approvalStatusA, setApprovalStatusA] = useState(false);
  const [approvalStatusB, setApprovalStatusB] = useState(false);
  const [updateStatus, setupdateStatus] = useState(false);
  const [isTrnsiction, setIsTransiction] = useState(false);

  let { userWallet, isWalletConnected, networkStatus } = useSelector((state) => state.connect);
  let { tokenB } = useSelector((state) => state.selectTokenB);

  const dispatch = useDispatch();
  const connectWallet = () => {
    dispatch(walletConnection());
  };
  let towei = 10 ** 18

  const [showTol, setShowTol] = useState(false);
  const handleShowTol = () => setShowTol(true);

  const addLiqudity = async () => {
    if (isWalletConnected && networkStatus) {
      try {
        setIsTransiction(true)

        if (
          valueA == null ||
          valueB == null ||
          valueA == undefined ||
          valueB == undefined ||
          valueA == "" ||
          valueB == ""
        ) {
          setIsTransiction(false)
          toast.info("Input fields are mandatory");
          return;
        }
        // if (pairAddressData.token0Symbol ===nativeCurrency || pairAddressData.token1Symbol ===nativeCurrency) {
        //   let userBal = await userWalletBal(userWallet);
        //   if (fromWei(userBal) < valueA) {
        //     toast.info("Insufficient BNB amount");
        //     return;
        //   }
        // } else if (pairAddressData.token0Symbol != "BNB" && pairAddressData.token1Symbol != "BNB") {
        //   const tokenBInstance = await createTokenInstance(tokenB.address);
        //   let tokenBBal = await tokenBInstance.methods
        //     .balanceOf(userWallet)
        //     .call();
        //   if (fromWei(tokenBBal) < valueB) {
        //     toast.info(`Insufficient ${tokenB.coin} amount`);
        //     return;
        //   }
        //   const tokenAInstance = await createTokenInstance(tokenA.address);
        //   let tokenABal = await tokenAInstance.methods
        //     .balanceOf(userWallet)
        //     .call();
        //   if (fromWei(tokenABal) < valueA) {
        //     toast.info(`Insufficient ${tokenA.coin} amount`);
        //     return;
        //   }
        // } else if (tokenA.coin != "BNB") {
        //   const tokenAInstance = await createTokenInstance(tokenA.address);
        //   let tokenABal = await tokenAInstance.methods
        //     .balanceOf(userWallet)
        //     .call();
        //   if (fromWei(tokenABal) < valueA) {
        //     toast.info(`Insufficient ${tokenA.coin} amount`);
        //     return;
        //   }
        // } else if (tokenB.coin != "BNB") {
        //   const tokenBInstance = await createTokenInstance(tokenB.address);
        //   let tokenBBal = await tokenBInstance.methods
        //     .balanceOf(userWallet)
        //     .call();
        //   if (fromWei(tokenBBal) < valueB) {
        //     toast.info(`Insufficient ${tokenB.coin} amount`);
        //     return;
        //   }
        // }
        if (pairAddressData.token0Symbol === nativeCurrency) {
          // const tokenBInstance = await createTokenInstance(tokenB.address);
          // await tokenBInstance.methods
          //   .approve(virtualRouterAddress, toWei(valueB))
          //   .send({
          //     from: userWallet,
          //   });
          const amountETHDesired = ((Number(valueA) * 10 ** 18));
          const amountTokenDesired = ((Number(valueB) * 10 ** 18));
          console.log('amountETHDesired', amountETHDesired);
          console.log('amountTokenDesired', amountTokenDesired);
          const amountTokenMin = (Math.floor(
            (amountTokenDesired * (100 - slippageTolerance)) / 100
          ));
          const amountETHMin = (Math.floor(
            (amountETHDesired * (100 - slippageTolerance)) / 100
          ));
          console.log('amountTokenMin', (amountTokenMin));
          console.log('amountETHMin', amountETHMin);
          const routerContract = await routerContractRef();
          await routerContract.methods
            .addLiquidityETH(
              pairAddressData.token1Address,
              toPlainString(amountTokenDesired.toFixed(0)),
              toPlainString(amountTokenMin.toFixed(0)),
              toPlainString(amountETHMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({
              from: userWallet,
              value: toPlainString(amountETHDesired.toFixed(0)),
            });
          setupdateStatus(!updateStatus)

          toast.success('Liquidity added');
          setValueB('')
          setValueA('')
          myfun()
          setIsTransiction(false)

        } else if (pairAddressData.token1Symbol === nativeCurrency) {
          // const tokenAInstance = await createTokenInstance(tokenA.address);
          // await tokenAInstance.methods
          //   .approve(virtualRouterAddress, toWei(valueA))
          //   .send({
          //     from: userWallet,
          //   });
          const amountTokenDesired = Number(valueA * 10 ** 18);
          const amountETHDesired = Number(valueB * 10 ** 18);
          const amountTokenMin = Math.floor(
            (amountTokenDesired * (100 - slippageTolerance)) / 100
          );
          const amountETHMin = Math.floor(
            (amountETHDesired * (100 - slippageTolerance)) / 100
          );
          const routerContract = await routerContractRef();
          await routerContract.methods
            .addLiquidityETH(
              pairAddressData.token0Address,
              toPlainString(amountTokenDesired.toFixed(0)),
              toPlainString(amountTokenMin.toFixed(0)),
              toPlainString(amountETHMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({
              from: userWallet,
              value: toPlainString(amountETHDesired.toFixed(0)),
            });
          setupdateStatus(!updateStatus)

          toast.success('Liquidity Added.');
          setValueB('')
          setValueA('')
          myfun()
          setIsTransiction(false)

        } else {
          // const tokenAInstance = await createTokenInstance(tokenA.address);
          // await tokenAInstance.methods
          //   .approve(virtualRouterAddress, toWei(valueA))
          //   .send({
          //     from: userWallet,
          //   });
          // const tokenBInstance = await createTokenInstance(tokenB.address);
          // await tokenBInstance.methods
          //   .approve(virtualRouterAddress, toWei(valueB))
          //   .send({
          //     from: userWallet,
          //   });
          const amountADesired = Number(valueA * 10 ** 18);
          const amountBDesired = Number(valueB * 10 ** 18);
          const amountAMin = Math.floor(
            (amountADesired * (100 - slippageTolerance)) / 100
          );
          const amountBMin = Math.floor(
            (amountBDesired * (100 - slippageTolerance)) / 100
          );
          const routerContract = await routerContractRef();
          await routerContract.methods
            .addLiquidity(
              pairAddressData.token0Address,
              pairAddressData.token1Address,
              toPlainString(amountADesired.toFixed(0)),
              toPlainString(amountBDesired.toFixed(0)),
              toPlainString(amountAMin.toFixed(0)),
              toPlainString(amountBMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({ from: userWallet });
          setupdateStatus(!updateStatus)

          toast.success('Liquidity Added.');
          setValueB('')
          setValueA('')
          myfun()
          setIsTransiction(false)

        }
      } catch (error) {
        setIsTransiction(false)

        console.error("error while add liqudity", error.message);
      }
    }

  };


  // function to set values of A fields.
  // This function will be called when value will be entered while pressing percent buttons.
  const setValueAFromPercent = async (percent) => {
    if (percent === 'MAX') {
      setValueA(pairAddressData.token0Balance);
      setValueB(pairAddressData.token0Balance * pairAddressData.rateFromAtoB);
      if (isWalletConnected) {
        if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusA(pairAddressData.token0Balance)
        if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(pairAddressData.token0Balance * pairAddressData.rateFromAtoB)
      }
      setShareOfTradingPair(pairAddressData.token0Balance, pairAddressData.token0Balance * pairAddressData.rateFromAtoB)
      if (Number(pairAddressData.token0Balance * pairAddressData.rateFromAtoB) > Number(pairAddressData.token1Balance)) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token1Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }

    } else { // percent is not max
      let result = pairAddressData.token0Balance * Number(percent) / 100;
      setValueA(result);
      setValueB(result * pairAddressData.rateFromAtoB);
      if (isWalletConnected) {
        if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusOfA(result);
        if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(result * pairAddressData.rateFromAtoB);
      }
      setShareOfTradingPair(result, result * pairAddressData.rateFromAtoB);
      if (Number(result * pairAddressData.rateFromAtoB) > Number(pairAddressData.token1Balance)) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token1Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }
    }
  }

  // function to set values of B fields.
  // This function will be called when value will be entered while pressing percent buttons.
  const setValueBFromPercent = async (percent) => {
    if (percent === 'MAX') {
      setValueB(pairAddressData.token1Balance);
      setValueA(pairAddressData.token1Balance * pairAddressData.rateFromBtoA);
      if (isWalletConnected) {
        if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(pairAddressData.token1Balance)
        if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusOfA(pairAddressData.token1Balance * pairAddressData.rateFromBtoA)
      }
      setShareOfTradingPair(pairAddressData.token1Balance * pairAddressData.rateFromBtoA, pairAddressData.token1Balance)
      if (Number(pairAddressData.token1Balance * pairAddressData.rateFromBtoA) > Number(pairAddressData.token0Balance)) {
        console.log('hello')
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token0Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }

    } else { // percent is not max
      let result = pairAddressData.token1Balance * Number(percent) / 100;
      setValueB(result);
      setValueA(result * pairAddressData.rateFromBtoA);
      if (isWalletConnected) {
        if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(result);
        if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusOfA(result * pairAddressData.rateFromBtoA);
      }
      setShareOfTradingPair(result * pairAddressData.rateFromBtoA, result);
      if (Number(result * pairAddressData.rateFromBtoA) > Number(pairAddressData.token0Balance)) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token0Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }
    }
  }


  // function to set values of A fields.
  // This function will be called when values will be entered manually in the A field
  const setValuesForA = async (_value) => {
    if (_value == 0) {
      setValueA(_value);
      setValueB('')
    }
    else {

      setValueA(_value);
      setValueB(_value * pairAddressData.rateFromAtoB);
      if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusOfA(_value);
      if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(_value * pairAddressData.rateFromAtoB);
      let flag = false
      if (Number(_value) > pairAddressData.token0Balance) {
        flag = true
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token0Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }
      if (Number(_value * pairAddressData.rateFromAtoB) > pairAddressData.token1Balance) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token1Symbol} Balance`
        })
      } else {
        if (flag == false) {

          seterrorMessage({
            ...errorMessage, disable: false, btnText: `Add Liquidity`
          })
        }
      }
      setShareOfTradingPair(_value, _value * pairAddressData.rateFromAtoB);
    }


  }

  // function to set values of B fields.
  // This function will be called when values will be entered manually in the B field
  const setValuesForB = async (_value) => {
    if (_value == 0) {
      setValueB(_value);
      setValueA('')
    }
    else {
      setValueB(_value);
      setValueA(_value * pairAddressData.rateFromBtoA);
      if (pairAddressData.token1Symbol != nativeCurrency) setApprovalStatusOfB(_value);
      if (pairAddressData.token0Symbol != nativeCurrency) setApprovalStatusOfA(_value * pairAddressData.rateFromBtoA);
      if (Number(_value) > pairAddressData.token1Balance) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token1Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }
      if (Number(_value * pairAddressData.rateFromBtoA) > pairAddressData.token0Balance) {
        seterrorMessage({
          ...errorMessage, disable: true, btnText: `insuffcient ${pairAddressData.token0Symbol} Balance`
        })
      } else {
        seterrorMessage({
          ...errorMessage, disable: false, btnText: `Add Liquidity`
        })
      }
      setShareOfTradingPair(_value * pairAddressData.rateFromBtoA, _value);
    }


  }

  // function to enable button for approval of A tokens if needed
  const setApprovalStatusOfA = async (_valueA) => {
    let tokenAContract = await createTokenInstance(pairAddressData.token0Address);
    let allowance = await tokenAContract.methods.allowance(userWallet, virtualRouterAddress).call();
    console.log('Allowance', allowance)
    if (Number(allowance) < (_valueA * towei)) {
      setApprovalStatusA(true);
      seterrorMessage({
        ...errorMessage, disable: true, btnText: `Enable first`
      })
    }
  }

  // function to enable button for approval of token B if needed.
  const setApprovalStatusOfB = async (_valueB) => {
    let tokenBContract = await createTokenInstance(pairAddressData.token1Address);
    let allowance = await tokenBContract.methods.allowance(userWallet, virtualRouterAddress).call();
    console.log("allowance", allowance);
    if (Number(allowance) < (_valueB * towei)) {
      setApprovalStatusB(true);
      seterrorMessage({
        ...errorMessage, disable: true, btnText: `Enable first`
      })
    }
  }
  // function to calculate share in tranding pair.
  const setShareOfTradingPair = async (_valueA, _valueB) => {
    let liqudityA = (_valueA * towei) * pairAddressData.totalSupply / pairAddressData.reserve0;
    let liqudityB = (_valueB * towei) * pairAddressData.totalSupply / pairAddressData.reserve1;
    const liqudity = liqudityA < liqudityB ? liqudityA : liqudityB;

    let _totalSupply = Number(pairAddressData.totalSupply) + Number(liqudity);

    let share = liqudity / _totalSupply * 100;

    setShareInTradingPair(share.toFixed(2));
  }

  // function to approve token A to router
  // this function will be called while pressing Enable tokenA.coin button.
  const approveForTokenAToRouter = async () => {
    let tokenAContract = await createTokenInstance(pairAddressData.token0Address);
    let approveTx = await tokenAContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
      .send({ from: userWallet });
    toast.success('Approved Successfully to router');
    seterrorMessage({
      ...errorMessage, disable: false, btnText: `Add Liquidity`
    })
    setupdateStatus(!updateStatus)

    setApprovalStatusA(false);
  }

  // function to approve token B to router
  // this function will be called while pressing Enable tokenB.coin button.
  const approveForTokenBToRouter = async () => {
    let tokenBContract = await createTokenInstance(pairAddressData.token1Address);
    let approveTx = await tokenBContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
      .send({ from: userWallet });
    toast.success('Approved Successfully to router');
    seterrorMessage({
      ...errorMessage, disable: false, btnText: `Add Liquidity`
    })
    setupdateStatus(!updateStatus)

    setApprovalStatusB(false);
  }
  const myfun = () => {
    if (isWalletConnected) {
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
  useEffect(() => {

    myfun();
  }, [userWallet, updateStatus]);
  return (
    <div className="liqui_bg">
      <div className="container ">
        <div className="row d-flex justify-content-center mb-5 ">
          <div className="col-md-12 mt-5">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-lg-5 col-md-5 col-12 responsive-swap2">
                <div className="swap-bg justify-content-center">

                  <div className="row d-flex justify-content-between margin-swap">

                    <div className="col-md-12">
                      {/* <div className="row d-flex justify-content-between">
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
                    </div> */}
                    </div>
                  </div>
                  <div className="row d-flex-justify-content-center p-3">
                    <HashLink to="/trade_liqudity" className="text-white text_btn">
                      <IoMdArrowRoundBack className="fs-4 text-start" style={{ cursor: "pointer" }} />
                    </HashLink>
                    <div className="col-md-8">
                      <div className="text-white tYour">Liqudity</div>
                      <div className=" text_trade_token text-white">
                        Trade tokens in an instant
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <AiFillSetting
                        className="diff_clr_two   mt-1"
                        onClick={handleShowTol}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>


                  <ToleranceModal
                    show={showTol}
                    onHide={() => setShowTol(false)}
                  />
                  <div className="row d-flex justify-content-center p-3">
                    <div className="col-md-12 col-12">


                      <div
                        className="input-group style_group "
                        style={{ backgroundColor: "none !important" }}
                      >
                        {/* <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span> */}
                        <input
                          type="number"
                          className="pad height_inp border-0 outline-0"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                          value={valueA}
                          placeholder="0.0"
                          onChange={(e) => {
                            setValuesForA(e.target.value);
                          }}
                        />


                        <Button
                          className="bg-dark main_btn ms-auto"
                          variant="primary"
                        // onClick={handleShow}
                        >
                          <span className="me-1">

                            {/* <RiQuestionLine /> */}
                          </span>
                          {pairAddressData?.token0Symbol}
                        </Button>
                        <p className="col-md-12 col-12 balence d-flex justify-content-between ms-auto mt-2 text-light">
                          {isWalletConnected && <>Balance:{Number(pairAddressData?.token0Balance).toLocaleString()}</>}

                        </p>
                        <div className="d-flex m-1 ms-auto justify-content-end mb-2">
                          {[25, 50, 75, "MAX"].map((item, index, arr) => {
                            return (
                              <button
                                key={index}
                                className="input_btn"
                                onClick={() => {
                                  setValueAFromPercent(item);
                                }}
                              >
                                {item}
                                {item == "MAX" ? "" : "%"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* <div className="text-end copy_icon">
                      <img
                        src={ExchangeIcon}
                        className="img-fluid "
                        alt=""
                        width={"20px"}
                      />
                    </div> */}
                      <div className="text-center text-light fs-4">
                        <AiOutlinePlus className="plus_icon fs-5" />
                      </div>




                      <div
                        className="input-group style_group mt-2"
                        style={{ backgroundColor: "none !important" }}
                      >

                        <input
                          type="number"
                          className="pad height_inp border-0 outline-0"
                          id="basic-url"
                          aria-describedby="basic-addon3"
                          value={valueB}
                          placeholder="0.0"
                          onChange={(e) => {
                            setValuesForB(e.target.value);
                          }}
                        />
                        <Button
                          className="bg-dark main_btn  ms-auto"
                          variant="primary"
                        >
                          <span className="me-1">
                            {/* <RiQuestionLine /> */}
                          </span>
                          {pairAddressData?.token1Symbol}
                        </Button>
                        <p className="col-md-12 col-12 balence d-flex justify-content-between ms-auto mt-2 text-light">
                          {isWalletConnected && <> Balance:{Number(pairAddressData?.token1Balance).toLocaleString()}</>}
                        </p>
                        <div className="d-flex m-1 ms-auto justify-content-end">
                          {[25, 50, 75, "MAX"].map((item, index, arr) => {
                            return (
                              <button
                                key={index}
                                className="input_btn"
                                onClick={() => {
                                  setValueBFromPercent(item);
                                }}
                              >
                                {item}
                                {item == "MAX" ? "" : "%"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* <div className="text-end copy_icon">
                      <img
                        src={CopyIcon}
                        className="img-fluid "
                        width={"20px"}
                        alt=""
                      />
                    </div> */}

                      {errorMessage?.priceImpactHigh}
                      <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                        {
                          isPairAddressData && <div className="row p-1 d-flex m-2">
                            {/* <h5 className="text-white">Price and Share</h5>
                      <hr /> */}
                            <div className="d-flex main_price_res justify-content-between" style={{ border: "1px solid rgb(76, 79, 95)" }}>
                              <div className="text-center res_pair">

                                <p className="text-white">{Number(toPlainString(pairAddressData?.rateFromAtoB)).toLocaleString("en-us", { minimumFractionDigits: 5, maximumFractionDigits: 10 })}</p>
                                <p className="text-white">{pairAddressData.token1Symbol} per {pairAddressData?.token0Symbol}</p>
                              </div>

                              <div className="text-center text-white res_pair">

                                <p className="">{Number(toPlainString(pairAddressData?.rateFromBtoA)).toLocaleString("en-us", { minimumFractionDigits: 5, maximumFractionDigits: 10 })}</p>
                                <p className="">{pairAddressData?.token0Symbol} per {pairAddressData?.token1Symbol}</p>
                              </div>

                              <div className="text-center text-white res_pair">

                                <p className="">{`${shareInTradingPair}%`}</p>
                                <p className="">Share in trading pair</p>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    {isWalletConnected ? (
                      <div
                        className="row d-flex justify-content-center mt-3 mb-3"
                      >
                        <div className="col-md-12 col-12">
                          {/* {console.log('disabled', valueA.length == undefined ? true : false)} */}
                          <button
                            className="connect_button "
                            disabled={errorMessage.disable || !valueA || !valueB || isTrnsiction}
                            onClick={addLiqudity}
                          >
                            {errorMessage.btnText}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="row d-flex justify-content-center mt-3 mb-5"
                        onClick={connectWallet}
                      >
                        <div className="col-md-12 col-12">
                          <button className="connect_button">
                            {isWalletConnected ? (
                              <span id="wallet_address">
                                {walletShortFormer(userWallet)}
                              </span>
                            ) : (
                              "Connect Wallet"
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="d-flex justify-content-between">
                      {isWalletConnected && approvalStatusA && (
                        <div className="row d-flex justify-content-center">
                          <div className="col-md-12 col-12">
                            <div className=" d-flex justify-content-around">
                              <div >
                                <button className="enable_btn btn-block btn_enable" type="button" onClick={approveForTokenAToRouter}>Enable {pairAddressData.token0Symbol}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {isWalletConnected && approvalStatusB && (
                        <div className="row d-flex justify-content-center">
                          <div className="col-md-12 col-12">
                            <div className=" d-flex justify-content-around">
                              <div >
                                <button className="enable_btn btn-block btn_enable" type="button" onClick={approveForTokenBToRouter}>Enable {pairAddressData.token1Symbol}</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {isPairAddressData && (
                  <div className=" mt-3 ">
                    <div className="swap-bg p-3 rounded-4">
                      <p className="text-white"> LP tokens in your wallet</p>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className=" text-white">
                            {pairAddressData?.token0Symbol}-{pairAddressData?.token1Symbol} LP:
                          </span>
                        </div>
                        <div className="text-white text-end">
                          <b>{Number(pairAddressData?.liquidity).toLocaleString()}</b>
                          <p className="mb-0 text-muted ">(8.257 USD)</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className=" text-white">
                            Share in Trading Pair:
                          </span>
                        </div>
                        <div className="text-white">
                          <b>{(pairAddressData?.shareInPool).toFixed(5)}%</b>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className=" text-white">Pooled {pairAddressData?.token0Symbol}:</span>
                        </div>
                        <div className="text-white text-end">
                          <b>{Number(pairAddressData?.token0Pooled).toLocaleString()} </b>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <span className=" text-white">Pooled {pairAddressData?.token1Symbol}:</span>
                        </div>
                        <div className="text-white text-end">
                          <b>{Number(pairAddressData?.token1Pooled).toLocaleString()}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>


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
    </div >



  );
}

export default LiquditySwap;
