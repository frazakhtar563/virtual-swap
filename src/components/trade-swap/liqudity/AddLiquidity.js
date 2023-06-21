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
import { routerContractRef, WBNBContractRef, factoryContractRef, createTokenInstance, createPairInstance } from "../../../instances/instances"
import { useSelector, useDispatch } from "react-redux";
import { connectionAction } from "../../../Redux/connection/actions";
import { walletShortFormer } from "../../../utils";
import { fromWei, toWei, userWalletBal } from "../../../constants";
import { virtualRouterAddress, wbnbAddress } from "../../../instances/addresses";

import { toast } from 'react-toastify'
import { AiOutlineWarning } from 'react-icons/ai';

function AddLiquidity() {
  const { tokenABalance, tokenBBalance, walletBalance } = useSelector((state) => state.allBalances);
  console.log("tokenABalance", tokenABalance);
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [valueA, setValueA] = useState()
  const [valueB, setValueB] = useState()
  const [balanceA, setBalanceA] = useState()
  const [balanceB, setBalanceB] = useState()
  const [calculatePercent, setcalculatePercent] = useState()
  const [rateFromAtoB, setrateFromAtoB] = useState()
  const [rateFromBtoA, setrateFromBtoA] = useState()
  const [disabled, setDisable] = useState(true)
  const [btnText, setbtnText] = useState('Add Liquidity')
  const [errorMessage, seterrorMessage] = useState({

  })


  const [tokenA, setTokenA] = useState({
    coin: nativeCurrency,
    pic: coin,
    address: ""
  })
  const [tokenB, setTokenB] = useState({
    coin: "Virtual",
    pic: coin,
    address: "0xa718bC2727bEB640E7200d620852cD83140c234C"
  })

  let { userWallet, isWalletConnected,networkStatus } = useSelector((state) => state.connect);
  console.log('userWallet', userWallet)
  const dispatch = useDispatch()
  const connectWallet = () => {
    dispatch(connectionAction());
  };

  const showBalanceInBNB = async () => {
    let balance = await userWalletBal(userWallet);
    balance = fromWei(balance)
    balance = Number(balance).toFixed(5)

    setBalanceA(balance);

  }

  const addLiqudity = async () => {
    if(isWalletConnected && networkStatus){
      try {
        if (valueA == null || valueB == null || valueA == undefined || valueB == undefined || valueA == "" || valueB == "") {
          toast.info("Input fields is mandatory");
          return
        }
        if (tokenA.coin ==nativeCurrency || tokenB.coin ==nativeCurrency) {
          let userBal = await userWalletBal(userWallet);
          if (fromWei(userBal) < valueA) {
            toast.info("Insufficient BNB amount")
            return
          }
        } else if (tokenA.coin != nativeCurrency && tokenB.coin != nativeCurrency) {
          const tokenBInstance = await createTokenInstance(tokenB.address);
          let tokenBBal = await tokenBInstance.methods.balanceOf(userWallet).call();
          if (fromWei(tokenBBal) < valueB) {
            toast.info(`Insufficient ${tokenB.coin} amount`)
            return
          }
          const tokenAInstance = await createTokenInstance(tokenA.address);
          let tokenABal = await tokenAInstance.methods.balanceOf(userWallet).call();
          if (fromWei(tokenABal) < valueA) {
            toast.info(`Insufficient ${tokenA.coin} amount`)
            return
          }
        } else if (tokenA.coin != nativeCurrency) {
          const tokenAInstance = await createTokenInstance(tokenA.address);
          let tokenABal = await tokenAInstance.methods.balanceOf(userWallet).call();
          if (fromWei(tokenABal) < valueA) {
            toast.info(`Insufficient ${tokenA.coin} amount`)
            return
          }
        } else if (tokenB.coin != nativeCurrency) {
          const tokenBInstance = await createTokenInstance(tokenB.address);
          let tokenBBal = await tokenBInstance.methods.balanceOf(userWallet).call();
          if (fromWei(tokenBBal) < valueB) {
            toast.info(`Insufficient ${tokenB.coin} amount`)
            return
          }
        }
        if (tokenA.coin ==nativeCurrency) {
          const tokenBInstance = await createTokenInstance(tokenB.address);
          await tokenBInstance.methods.approve(virtualRouterAddress, toWei(valueB)).send({
            from: userWallet
          })
          const routerContract = await routerContractRef();
          await routerContract.methods.addLiquidityETH(
            tokenB.address,
            toWei(valueB),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300
          ).send(
            {
              from: userWallet,
              value: valueA
            })
        }
        else if (tokenB.coin ==nativeCurrency) {
          const tokenAInstance = await createTokenInstance(tokenA.address);
          await tokenAInstance.methods.approve(virtualRouterAddress, toWei(valueA)).send({
            from: userWallet
          })
          const routerContract = await routerContractRef();
          await routerContract.methods.addLiquidityETH(
            tokenA.address,
            toWei(valueA),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300
          ).send(
            {
              from: userWallet,
              value: valueB
            })
        }
        else {
          const tokenAInstance = await createTokenInstance(tokenA.address);
          await tokenAInstance.methods.approve(virtualRouterAddress, toWei(valueA)).send({
            from: userWallet
          })
          const tokenBInstance = await createTokenInstance(tokenB.address);
          await tokenBInstance.methods.approve(virtualRouterAddress, toWei(valueB)).send({
            from: userWallet
          })
          const routerContract = await routerContractRef();
          await routerContract.methods.addLiquidity(
            tokenA.address,
            tokenB.address,
            toWei(valueA),
            toWei(valueB),
            0,
            0,
            userWallet,
            Math.floor(Date.now() / 1000) + 300
          ).send(
            { from: userWallet }
          )
        }
      } catch (error) {
        console.error("error while add liqudity", error);
      }
    }
    
  
  }
  const getBalanceA = async () => {




    if (tokenA.coin == nativeCurrency) {
      await showBalanceInBNB()
    }
    else {
      const tokenAInstance = await createTokenInstance(tokenA.address);
      let tokenABal = await tokenAInstance.methods.balanceOf(userWallet).call();
      console.log('tokenABal', tokenABal);
      tokenABal = fromWei(tokenABal)
      tokenABal = Number(tokenABal).toFixed(5)

      setBalanceA(tokenABal);


    }





  }
  const getBalanceB = async () => {
    if (tokenB.coin == nativeCurrency) {
      let balance = await userWalletBal(userWallet);
      balance = fromWei(balance)
      balance = Number(balance).toFixed(5)

      setBalanceB(balance);
    }
    else {
      const tokenBInstance = await createTokenInstance(tokenB.address);
      let tokenBBal = await tokenBInstance.methods.balanceOf(userWallet).call();
      tokenBBal = fromWei(tokenBBal)
      tokenBBal = Number(tokenBBal).toFixed(5)

      setBalanceB(tokenBBal);
    }

  }

  const getReserve = async () => {
    // let wbnContract = await WBNBContractRef();
    let factoryContract = await factoryContractRef();
    let pairAddress

    if (tokenA.coin == nativeCurrency) { // if first is BNB
      pairAddress = await factoryContract.methods.getPair(wbnbAddress, tokenB.address).call()
    }
    else if (tokenB.coin === nativeCurrency) { // if second is BNB
      pairAddress = await factoryContract.methods.getPair(tokenA.address, wbnbAddress).call()
    }
    else { // if none of both is BNB
      pairAddress = await factoryContract.methods.getPair(tokenA.address, tokenB.address).call();
    }


    let pairContract = await createPairInstance(pairAddress)
    let { _reserve0, _reserve1 } = await pairContract.methods.getReserves().call()
    let _rateFromAtoB = _reserve0 / _reserve1;
    setrateFromAtoB(_rateFromAtoB)
    let _rateFromBtoA = _reserve1 / _reserve0;
    setrateFromBtoA(_rateFromBtoA)



    console.log('_reserve0', _reserve0);
    console.log('rateFromAtoB', rateFromAtoB);
    console.log('_reserve1', _reserve1);
    console.log('rateFromBtoA', rateFromBtoA);
  }

  const setValuesForA = async (_value) => {
    if (typeof _value === 'string') {
      if (_value === "MAX") {

        setValueA(balanceA);
        setValueB(balanceA * rateFromAtoB)
      }
      else {
        let result = balanceA * Number(_value) / 100;
        console.log('result', result);
        setValueA(result);
        setValueB(result * rateFromAtoB);
      }
    }
    else {
      setValueA(_value);
      setValueB(_value * rateFromAtoB);
    }
    if (Number(_value) > Number(balanceA)) {
      toast.error(`value is greater then${balanceA}`)
      setbtnText(`Insufficient ${tokenA.coin} Balance`)
    }

  }

  const setValuesForB = async (_value) => {

    if (typeof _value === 'string') {
      if (_value === "MAX") {
        setValueB(balanceB);
        let result = balanceB * rateFromBtoA;
        if (result > balanceA) {
          seterrorMessage({
            priceImpactHigh: <> <div className="text-danger">
              Price Impact Too High. <b>Reduce amount of {tokenA.coin} to maximum limit</b>
            </div>
              <button className="connect_button" onClick={reduceValueB}>
                Reduce {tokenA.coin}
              </button>
            </>
          })


          setValueA(balanceA)
        }
        else {
          seterrorMessage(null)

          setValueA(result)
        }
      }
      else {
        let result = balanceB * Number(_value) / 100;
        console.log('result', result);
        seterrorMessage(null)

        setValueB(result);
        if (result * rateFromBtoA > balanceA) {
          seterrorMessage({
            priceImpactHigh: <> <div className="text-danger">
              Price Impact Too High. <b>Reduce amount of {tokenA.coin} to maximum limit</b>
            </div>
              <button className="connect_button" onClick={reduceValueB}>
                Reduce {tokenA.coin}
              </button>
            </>
          })

          setValueA(balanceA)
        }
        else {
          seterrorMessage(null)

          setValueA(result * rateFromBtoA);
        }
      }
    }
    else {
      setValueB(_value);
      let result = _value * rateFromBtoA
      if (result > balanceA) {
        seterrorMessage({
          priceImpactHigh: <> <div className="text-danger">
            Price Impact Too High. <b>Reduce amount of {tokenA.coin} to maximum limit</b>
          </div>
            <button className="connect_button" onClick={reduceValueB}>
              Reduce {tokenA.coin}
            </button>
          </>
        })

        setValueA(balanceA)
      }
      else {
        seterrorMessage(null)
        setValueA(result);
      }
    }
  }

  const reduceValueB = async () => {
    setValueB(balanceA * rateFromAtoB)
    seterrorMessage(null)
  }
  useEffect(() => {
    const myfun = async () => {
      if (userWallet == 'Connect Wallet') {
        console.log('plz 1st connect')
      }
      else {
        await getBalanceA()
        await getBalanceB()
        await getReserve()

      }

    }

    myfun()
    // showBalanceInBNB()
    console.log("token0", tokenA);
    console.log("token1", tokenB);

  }, [tokenA, tokenB, userWallet])
  return (
    <div className="container" > 
      <div className="row d-flex justify-content-center mb-5 ">
        <div className="col-md-12 swap-margin">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 responsive-swap2">
              <div className="swap-bg">
                <div className="row d-flex justify-content-between margin-swap">
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
                </div>
                <div className="row d-flex-justify-content-center mt-2 ">
                  <div className="col-md-12">
                    <div className="text-center tYour">Liqudity</div>
                    <div className="text-center text_trade_token">
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
                <div className="row d-flex justify-content-center">
                  <div className="col-md-10 col-10">
                    <label>
                      <div className="d-flex">
                        <button
                          className="btn  btn-drop dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() => setShowModalA(true)}
                        >
                          {tokenA.coin}
                        </button>
                        <p className="text-white mt-3 me-auto fs-10 font">Balance:{balanceA}</p>
                      </div>
                      <ModalA
                        show={showModalA}
                        setTokenA={setTokenA}
                        onHide={() => setShowModalA(false)}

                      />
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span>
                      <input
                        type="number"
                        className="form-control pad"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        value={valueA}
                        placeholder="0.0"
                        onChange={(e) => { setValuesForA(Number(e.target.value)) }}
                      />

                    </div>
                    <div className="d-flex m-1 me-auto justify-content-end">
                      {[25, 50, 75, 'MAX'].map((item, index, arr) => {
                        return (

                          <button className="input_btn" onClick={async () => { await setValuesForA(`${item}`) }}>{item}{item == 'MAX' ? '' : '%'}</button>

                        )
                      })}

                    </div>
                    <div className="text-end copy_icon">
                      <img
                        src={ExchangeIcon}
                        className="img-fluid  "
                        alt=""
                        width={"20px"}
                      />
                    </div>
                    <label>
                      <button
                        className="btn  btn-drop dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => setShowModalB(true)}
                      >
                        {tokenB.coin}
                      </button>
                      <span className="text-white">{balanceB}</span>

                      <ModalB
                        setTokenB={setTokenB}
                        show={showModalB}
                        onHide={() => setShowModalB(false)}
                      />
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        id="basic-url"
                        aria-describedby="basic-addon3"
                        value={valueB}
                        placeholder="0.0"
                        onChange={(e) => { setValuesForB(Number(e.target.value)) }}
                      />
                    </div>
                    <div className="d-flex m-1 me-auto justify-content-end">
                      {[25, 50, 75, 'MAX'].map((item, index, arr) => {
                        return (

                          <button className="input_btn" onClick={async () => { await setValuesForB(`${item}`) }}>{item}{item == 'MAX' ? '' : '%'}</button>

                        )
                      })}
                    </div>
                    <div className="text-end copy_icon">
                      <img
                        src={CopyIcon}
                        className="img-fluid "
                        width={"20px"}
                        alt=""
                      />
                    </div>

                    {errorMessage?.priceImpactHigh}


                  </div>
                </div>
              
                {isWalletConnected ?
                  <div className="row d-flex justify-content-center mt-3 mb-5" onClick={connectWallet}>
                    <div className="col-md-10 col-10">
                      {/* {console.log('disabled', valueA.length == undefined ? true : false)} */}
                      <button className="connect_button " disabled={true} onClick={addLiqudity}>
                        {btnText}
                      </button>

                    </div>
                  </div> :
                  <div className="row d-flex justify-content-center mt-3 mb-5" onClick={connectWallet}>
                    <div className="col-md-10 col-10">
                      <button className="connect_button">
                        {isWalletConnected ? <span id="wallet_address" >{walletShortFormer(userWallet)}</span> : "Connect Wallet"}
                      </button>

                    </div>
                  </div>}
                {isWalletConnected && <div className="row d-flex justify-content-center mt-3 mb-5">
                  <div className="col-md-10 col-10">
                    <div className=" d-flex justify-content-around">
                      {/* <div >
                        <button className="enable_btn btn-block" type="button">Enable BUD</button>

                      </div> */}
                      <div>
                        <button className="enable_btn" type="button">Enable BUD</button>

                      </div>
                    </div>

                  </div>
                </div>}
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
             
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-12 responsive-swap2">
            <div className="row p-3 justify-content-center border_inner">
                  <h5 className="text-white">Price and Share</h5>
                  <div className="col-lg-4 text-white">
                    <p>{rateFromAtoB}</p>
                    <p>{tokenB.coin} per {tokenA.coin}</p>
                  </div>
                  <div className="col-lg-4 text-white">
                    <p>{rateFromAtoB}</p>
                    <p>{tokenA.coin} per {tokenB.coin}</p>
                  </div><div className="col-lg-4 text-white">
                    <p>{rateFromBtoA}</p>
                    <p>Share in trading pair</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLiquidity;
