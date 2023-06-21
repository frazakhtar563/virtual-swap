import React, { useState, useRef, useEffect } from "react";
import TradeNavbar from "./Navbar/TradeNavbar";
import "./Trade_Swap.css";
import coin from "../../Assets/Images/bnb-logo.png";
import Virutalcoin from "../../Assets/Images/uu9.png";
import { AiFillSetting } from "react-icons/ai";
import NeedHelp from '../../Assets/NeedHelp.png'
import { useDispatch, useSelector } from "react-redux";
import { walletConnection } from "../../Redux/userWalletSlice/userWalletSlice";
import { changeValuesForTokenASwap } from "../../Redux/selectTokenASlice/selectTokenA";
import { changeValuesForTokenBSwap } from "../../Redux/selectTokenASlice/selectTokenB";
import { Button, Form } from "react-bootstrap";
import TokenAModal from "./liqudity/TokenAModal";
import TokenBModal from "./liqudity/TokenBModal";
import { arbiTokenAddress, wbnbAddress, virtualTokenAddress, virtualRouterAddress, factoryContractAddress } from "../../instances/addresses";
import { createTokenInstance, createPairInstance, factoryContractRef, routerContractRef } from "../../instances/instances";
import { fromWei, toWei, userWalletBal, toPlainString } from "../../constants";
import { getATokenBalance, getBTokenBalance, getWalletBalance } from "../../Redux/tokenBalnces/allBalances";
import { toast } from "react-toastify";
import { nativeCurrency } from "../../utils";
import Web3 from "web3";
import ToleranceModal from "./ToleranceModal";
import { TbExchange } from 'react-icons/tb'
import SwapGraph from "./liqudity/LiquiditySwapGraph";
import { IoIosArrowForward } from 'react-icons/io'
import tlogo from '../../Assets/tlogo.png'
function TradeSwap() {
  const [exchange, setExchange] = useState(false);
  const { tokenABalance, tokenBBalance, walletBalance } = useSelector((state) => state.allBalances);
  const [showTol, setShowTol] = useState(false);
  const handleShowTol = () => setShowTol(true);
  let { tokenA } = useSelector((state) => state.selectTokenA);
  let { tokenB } = useSelector((state) => state.selectTokenB);
  const dispatch = useDispatch();
  const [showA, setShowA] = useState(false);
  const [order, setHandleOrder] = useState(false);
  const [showB, setShowB] = useState(false);
  const handleShow = () => setShowA(true);
  const handleShowB = () => setShowB(true);
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [lastEnteredField, setLastEnteredField] = useState(0);
  const [updateStatus, setupdateStatus] = useState(false);
  const [isTrnsiction, setIsTransiction] = useState(false);
  const [active, setRouteActive] = useState("one");
  const [errorMessage, setErrorMesaage] = useState({
    disable: true,
    btnText: "Swap"
  })
  let { userWallet, isWalletConnected } = useSelector((state) => state.connect);
  let { slippageTolerance } = useSelector((state) => state.setting);

  // this state variable is used to store the path array for selected pair for later use while swapping
  const [pathOfPair, setPathOfPair] = useState([]);

  let ZOOM = 10 ** 18;
  // this flag is used to track the field in which last time value is entered.
  // benifit: By using this flag we will be able to track the field in which value is changed and this will help in calling different flavors of swap function according to the field.
  // flag == 0: value is entered in 1st field
  // flag == 1: value is entered in 2nd field 
  const [flag, setFlag] = useState(0);
  // constract variable to hold address 0 of blockchain
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  const connectWallet = () => {
    dispatch(walletConnection());
  };

  const getReserves = async (addressA, addressB) => {
    try {
      let factory = await factoryContractRef();
      let pair = await factory.methods.getPair(addressA, addressB).call();
      let pairContract = await createPairInstance(pair);

      let token0 = await pairContract.methods.token0().call();
      let token1 = await pairContract.methods.token1().call();

      let token0Contract = await createTokenInstance(token0);
      let token0Symbol = await token0Contract.methods.symbol().call();

      let token1Contract = await createTokenInstance(token1);
      let token1Symbol = await token1Contract.methods.symbol().call();

      let reserves = await pairContract.methods.getReserves().call();

      console.log('reserve', reserves);



    } catch (error) {
      console.log('error: getReserves', error.message);
    }
  }

  const handleAnimate = () => {
    setExchange(true);
    setTimeout(() => {
      setExchange(false);

    }, 2000);
  }
  const getPathForPair = async () => {
    try {
      if (tokenA.coin === nativeCurrency) {
        setPathOfPair([wbnbAddress, tokenB.address]);
        console.log('getPathForPair: tokenA is coin')
        console.log('getPathForPair', [wbnbAddress, tokenB.address]);
      }
      else if (tokenB.coin === nativeCurrency) {
        setPathOfPair([tokenA.address, wbnbAddress]);
        console.log('getPathForPair: tokenB is coin')
        console.log('getPathForPair', [tokenA.address, wbnbAddress]);
      }
      else {
        setPathOfPair([tokenA.address, tokenB.address]);
        console.log('getPathForPair: no one is coin')
        console.log('getPathForPair', [tokenA.address, tokenB.address]);
      }
    } catch (error) {
      console.log(error.message);
      console.log('error while getting path for pair');
    }
  }
  const getAmountOutForA = async (value) => {
    try {
      let router = await routerContractRef();
      let _rateAtoB = await router.methods.getAmountsOut(toWei(value), pathOfPair).call();
      console.log('_rateAtoB', _rateAtoB);
      return _rateAtoB[_rateAtoB.length - 1];
    } catch (error) {
      console.log(error.message);
      console.log('error while getting amount out for A');
      return 0;
    }
  }
  const getAmountInForB = async (value) => {
    console.log('value getAmountin', value)
    try {
      let router = await routerContractRef();
      let _rateBtoA = await router.methods.getAmountsIn(toWei(value), pathOfPair).call();
      console.log('_rateBtoA', _rateBtoA);
      return _rateBtoA[0];
    } catch (error) {
      console.log(error.message);
      console.log('error while getting amount in for B');
      return 0;
    }
  }


  const handleChangeA = async (value) => {

    // update flag value

    // setFlag(0);
    // e.preventDefault()



    if (value.length == 0) {
      setValueB('');
      setErrorMesaage({
        ...errorMessage, disable: true, btnText: `Enter Value`
      })
    }
    if (value == 0) {
      setValueA(value)
      setValueB('')
    }
    else { // if value != 0
      setValueA(value);
      let _amountOut = await getAmountOutForA(value);
      console.log('_amountOut', _amountOut);
      // value = rateFromAtoB * value
      setValueB(fromWei(_amountOut));
      if (_amountOut) {
        if (tokenA.coin === nativeCurrency) {
          if (Number((value)) > Number(walletBalance)) {
            setErrorMesaage({
              ...errorMessage, disable: true, btnText: `insuffcient ${tokenA.coin} Balance`
            })
          } else {
            setErrorMesaage({
              ...errorMessage, disable: false, btnText: `swap`
            })
          }
        } else if (tokenA.coin !== nativeCurrency) {
          if (Number((value)) > Number(tokenABalance)) {
            setErrorMesaage({
              ...errorMessage, disable: true, btnText: `insuffcient ${tokenA.coin} Balance`
            })
          } else {
            setErrorMesaage({
              ...errorMessage, disable: false, btnText: `swap`
            })
          }
        }
      } else if (_amountOut == 0) { // if amountOut == 0
        setErrorMesaage({
          ...errorMessage, disable: true, btnText: `insuffcient liquidity for ${tokenB.coin}`
        })
      }
      else {
        setErrorMesaage({
          ...errorMessage, disable: false, btnText: `swap`
        })
      }
    }

  }
  const handleChangeB = async (value) => {

    if (value.length == 0) {
      setValueA('');
      setErrorMesaage({
        ...errorMessage, disable: true, btnText: `Enter Value`
      })
    }
    if (value == 0) {
      setValueB(value)
      setValueA('')
    }
    else { // if value is valid
      setValueB(value);

      let _amountIn = await getAmountInForB(value);
      console.log('_amountIn', _amountIn);
      console.log('walletBalance', walletBalance);
      console.log('tokenABalance', tokenABalance);
      setValueA(fromWei(_amountIn));
      if (_amountIn) {
        if (tokenA.coin === nativeCurrency) {
          if (Number(fromWei(_amountIn)) > Number(walletBalance)) {
            setErrorMesaage({
              ...errorMessage, disable: true, btnText: `insuffcient ${tokenA.coin} Balance`
            })
          } else {
            setErrorMesaage({
              ...errorMessage, disable: false, btnText: `swap`
            })
          }
        } else if (tokenA.coin !== nativeCurrency) {
          if (Number(fromWei(_amountIn)) > Number(tokenABalance)) {
            setErrorMesaage({
              ...errorMessage, disable: true, btnText: `insuffcient ${tokenA.coin} Balance`
            })
          } else {
            setErrorMesaage({
              ...errorMessage, disable: false, btnText: `swap`
            })
          }
        }
      }
      else if (_amountIn == 0) { // if amountIn == 0

        setErrorMesaage({
          ...errorMessage, disable: true, btnText: `insuffcient liquidity for ${tokenA.coin}`
        })
      }
      else {
        setErrorMesaage({
          ...errorMessage, disable: false, btnText: `swap`
        })
      }
    }
  }
  const getBalanceA = async () => {
    if (tokenA.coin == nativeCurrency) {
      dispatch(getWalletBalance(userWallet))
    } else {
      console.log("getATokenBalance", userWallet);
      dispatch(getATokenBalance({
        tokenAddress: tokenA.address,
        userWallet: userWallet
      }))

    }
  };
  const getBalanceB = async () => {
    if (tokenB.coin == nativeCurrency) {
      dispatch(getWalletBalance(userWallet))
    } else {
      dispatch(getBTokenBalance({
        tokenAddress: tokenB.address,
        userWallet: userWallet
      }))
    }
  };


  // this function will check that pair is created for given pair or not
  // if pair is not created yet, then show error
  // otherwise call _swap() function.
  // @dev: Remove this function and call directly _swap() function afer implementing route functionality.
  const swap = async () => {
    console.log('tokenA swap', tokenA)
    console.log('tokenB swap', tokenB)
    try {
      // get pair address for selected pair.
      let factory = await factoryContractRef();
      let pairAddress;
      if (tokenA.coin === nativeCurrency) {
        pairAddress = await factory.methods.getPair(wbnbAddress, tokenB.address).call();
      } else if (tokenB.coin === nativeCurrency) {
        pairAddress = await factory.methods.getPair(tokenA.address, wbnbAddress).call();
      } else {
        pairAddress = await factory.methods.getPair(tokenA.address, tokenB.address).call();
      }

      // if pair is created yet then call _swap() function otherwise show an error.
      if (pairAddress === ZERO_ADDRESS) {
        toast.error('This pair is not created yet. Create pair first')
      } else {
        _swap();
      }
    } catch (error) {
      console.log('Error: swap()', error.message);
    }
  }

  // main function of swap.
  // this function will be called by clicking swap button.
  // @dev: after implementing route functionality (mentioned by Muaaz bhai) call this function directly by clicking button
  const _swap = async () => {
    // There will be three cases on each time swap button will be pressed.

    // 1. if token A is BNB
    if (tokenA.coin === nativeCurrency) {
      console.log('token a is bnb')
      _swap_1stBNB();
    }
    // 2. if token B is BNB
    else if (tokenB.coin === nativeCurrency) {
      console.log('token b is bnb')
      _swap_2ndBNB();
    }
    // 3. if none of them is BNB
    else {
      console.log('none of them is bnb')
      _swap_bothTokens();
    }
  }

  // 1. if tokenA is BNB
  const _swap_1stBNB = async () => {
    let router = await routerContractRef(); // router contract instance to call its functions.

    // there can be two cases in this scenario

    // i. if value entered in first field, then swapExactETHforTokens() will be called
    if (flag === 0) {
      console.log('Value entered in 1st field');
      try {
        setIsTransiction(true)
        // set path[] array
        const path = [wbnbAddress, tokenB.address];
        console.log('slipage in _swapIst is BNB', slippageTolerance)
        // slippage tolerance functionality
        const amountIn = toWei(Number(valueA));
        const amounts = await router.methods.getAmountsOut(amountIn, path).call();
        const amountOut = amounts[amounts.length - 1];
        const amountOutMin = Math.floor(amountOut * (1 - slippageTolerance / 100));

        // call the swapExactETHforTokens() of router
        let swapTx = await router.methods.swapExactETHForTokens(
          toPlainString(amountOutMin), // amountOutMin
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet,
            value: toPlainString(amountIn)
          });
        setupdateStatus(!updateStatus)
        setValueA('')
        setValueB('')
        toast.success('Swap Transaction succes');
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transactions detail', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)

      }

    }

    // ii. if value entered in second field, then swapETHforExactTokens() will be called
    else {
      console.log('Value entered in 2nd field');
      try {
        setIsTransiction(true)

        // set path[] array
        const path = [wbnbAddress, tokenB.address];

        // slippage tolerance functionality
        const amountOut = toWei(Number(valueB));
        const amounts = await router.methods.getAmountsIn(amountOut, path).call();
        const amountIn = amounts[0];
        const amountInMax = Math.floor(amountIn * (1 + slippageTolerance / 100));
        // call the swapETHforExactTokens() of router
        let swapTx = await router.methods.swapETHForExactTokens(
          toPlainString(amountOut), // amountOut
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet,
            value: toPlainString(amountInMax)
          });
        setupdateStatus(!updateStatus)
        setValueA('')
        setValueB('')
        toast.success('Swap Transaction succes');
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transactions detail', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)

      }

    }
  }

  // 2. if tokenB is BNB
  const _swap_2ndBNB = async () => {
    let router = await routerContractRef(); // router contract instance to call its functions.

    // there can be two cases in this scenario
    // i. if value entered in first field, then call swapExactTokensForETH() of router.
    if (flag === 0) {
      console.log('Value entered in 1st field');
      try {
        setIsTransiction(true)
        let tokenAContract = await createTokenInstance(tokenA.address);

        // set path[] array.
        const path = [tokenA.address, wbnbAddress];

        // check allowance. if allowance < valueA, approve maximum to router.
        let allowance = await tokenAContract.methods.allowance(userWallet, virtualRouterAddress).call();
        if (allowance < toWei(valueA)) {
          let approveTx = await tokenAContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
            .send({ from: userWallet });
          toast.success('Approved Successfully to router');
        }
        setupdateStatus(!updateStatus)

        // slippage tolerance functionality
        const amountIn = toWei(Number(valueA));
        const amounts = await router.methods.getAmountsOut(amountIn, path).call();
        const amountOut = amounts[amounts.length - 1];
        const amountOutMin = Math.floor(amountOut * (1 - slippageTolerance / 100));
        // call the swapExactTokensForETH()
        let swapTx = await router.methods.swapExactTokensForETH(
          toPlainString(amountIn), // tokenA value
          toPlainString(amountOutMin), // amountOutMin
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet
          });
        setupdateStatus(!updateStatus)

        toast.success('Swap successfully done');
        setValueA('')
        setValueB('')
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transaction', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)
      }

      // create instance of tokenA.

    }
    // ii. if value entered in second field, then call swapTokensForExactETH() of router.
    else {
      console.log('Value entered in 2nd field');
      try {
        setIsTransiction(true)
        let tokenAContract = await createTokenInstance(tokenA.address);

        // set path[] array.
        const path = [tokenA.address, wbnbAddress];

        // slippage tolerance functionality 
        const amountOut = toWei(valueB);
        const amounts = await router.methods.getAmountsIn(amountOut, path).call();
        const amountIn = amounts[0];
        const amountInMax = Math.floor(amountIn * (1 + slippageTolerance / 100));

        // check allowance. if allowance < inputAmount, approve maximum to router.
        let allowance = await tokenAContract.methods.allowance(userWallet, virtualRouterAddress).call();
        if (allowance < amountIn) {
          let approveTx = await tokenAContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
            .send({ from: userWallet });
          toast.success('Approved Successfully to router');
        }
        setupdateStatus(!updateStatus)

        // call the swapTokensForExactETH()
        let swapTx = await router.methods.swapTokensForExactETH(
          toPlainString(amountOut), // tokenA value
          toPlainString(amountInMax), // amountInMax
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet
          });
        setupdateStatus(!updateStatus)

        toast.success('Swap successfully done');
        setValueA('')
        setValueB('')
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transaction', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)
      }
      // create instance of tokenA.

    }
  }

  // 3. if none of them is BNB
  const _swap_bothTokens = async () => {
    let router = await routerContractRef();

    // there can be two cases in this scenario
    // i. if value entered in first field, then swapExactTokensForTokens() function will be called.
    if (flag === 0) {
      console.log('Value entered in 1st field')
      try {
        setIsTransiction(true)
        // create instance of tokenA.
        let tokenAContract = await createTokenInstance(tokenA.address);

        // set path[] array.
        const path = [tokenA.address, tokenB.address];

        // slippage tolerance functionality
        const amountIn = toWei(valueA);
        const amounts = await router.methods.getAmountsOut(amountIn, path).call();
        const amountOut = amounts[amounts.length - 1];
        const amountOutMin = Math.floor(amountOut * (1 - slippageTolerance / 100));

        // check allowance. if allowance < inputAmount, approve maximum to router.
        let allowance = await tokenAContract.methods.allowance(userWallet, virtualRouterAddress).call();
        if (allowance < amountIn) {
          let approveTx = await tokenAContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
            .send({ from: userWallet });
          toast.success('Approved Successfully to router');
        }
        setupdateStatus(!updateStatus)

        // call the swapExactTokensForTokens()
        let swapTx = await router.methods.swapExactTokensForTokens(
          toPlainString(amountIn), // tokenA value
          toPlainString(amountOutMin), // amountOutMin
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet
          });
        setupdateStatus(!updateStatus)

        toast.success('Swap successfully done');
        setValueA('')
        setValueB('')
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transaction', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)
      }

    }
    // ii. if value entered in second field, then call swapTokensForExactTokens() function.
    else {
      console.log('Value entered in 2nd field');
      try {
        setIsTransiction(true)
        // create instance of tokenA.
        let tokenAContract = await createTokenInstance(tokenA.address);

        // set path[] array.
        const path = [tokenA.address, tokenB.address];

        // slippage tolerance functionality
        const amountOut = toWei(valueB);
        const amounts = await router.methods.getAmountsIn(amountOut, path).call();
        const amountIn = amounts[0];
        const amountInMax = Math.floor(amountIn * (1 + slippageTolerance / 100));

        // check allowance. if allowance < inputAmount, approve maximum to router.
        let allowance = await tokenAContract.methods.allowance(userWallet, virtualRouterAddress).call();
        if (allowance < amountInMax) {
          let approveTx = await tokenAContract.methods.approve(virtualRouterAddress, Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1)))
            .send({ from: userWallet });
          toast.success('Approved Successfully to router');
          setupdateStatus(!updateStatus)

        }


        // call the swapTokensForExactTokens()
        let swapTx = await router.methods.swapTokensForExactTokens(
          toPlainString(amountOut), // tokenB value
          toPlainString(amountInMax), // amountInMax
          path,
          userWallet,
          Math.floor(Date.now() / 1000) + 60 * 5 // deadline: 5 minutes from the current unix time
        )
          .send({
            from: userWallet
          });
        setupdateStatus(!updateStatus)

        toast.success('Swap successfully done');
        setValueA('')
        setValueB('')
        getBalanceB()
        getBalanceA()
        setIsTransiction(false)

        console.log('Swap Transaction', swapTx);
      } catch (error) {
        setIsTransiction(false)
        console.log('error', error.message)
      }

    }
  }

  useEffect(() => {
    if (flag == 0) {
      handleChangeA(valueA)
    } else {
      handleChangeB(valueB)
    }
  }, [walletBalance, tokenABalance, tokenBBalance]);
  useEffect(() => {
    const myfun = async () => {
      if (isWalletConnected) {
        getBalanceA();
        getBalanceB();
      }
    };
    myfun();
  }, [userWallet])
  useEffect(() => {
    const getRate = async () => {
      // await getRates();
      await getPathForPair();
      if (tokenA.coin === nativeCurrency) {
        await getReserves(wbnbAddress, tokenB.address);
      }
      else if (tokenB.coin === nativeCurrency) {
        await getReserves(tokenA.address, wbnbAddress);
      }
      else {
        await getReserves(tokenA.address, tokenB.address);
      }
    }
    getRate()
  }, [tokenA, tokenB, updateStatus]);

  const changeOrder = async (order) => {
    console.log('order', order)
    setHandleOrder(!order)

    dispatch(changeValuesForTokenASwap(tokenB))
    dispatch(changeValuesForTokenBSwap(tokenA))
  }
  useEffect(() => {
    if (flag == 0) {
      console.log("call flag 0");
      if (!order) { // if flag == 0 && order == false
        console.log("call flag 0 and order false");
        handleChangeA(valueB);
      } else { // if flag == 0 && order == true
        console.log("call flag 0 and order true");
        handleChangeB(valueA)
      }
    } else { // if flag == 1 
      console.log("call flag 1");
      if (!order) { // if flag == 1 && order == false
        console.log("call flag 1 and order false");
        handleChangeB(valueA)
      } else { // if flag == 1 && order == true
        console.log("call flag 1 and order true");
        handleChangeA(valueB);
      }
    }
  }, [pathOfPair]);

  return (
    <div className="swap_bg">
      <div className="container">
        <TradeNavbar />
        <div className="row d-flex justify-content-center mb-5 p-3">
          <div className="col-md-12 mt-5 ">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-xl-6 order-2 order-lg-1 responsive-swap">
                <div className="swap-bg">
                  <div className="row responsive-swap-virtual">
                    <div className="col-12 ms-1 ">
                      <div className="d-flex">
                        <div className="p-2 d-flex">
                          <img
                            src={coin}
                            className="img-fluid coin"
                            alt=""
                            width={"30px"}
                          />
                          <div className="p-2 pe-0 BNB-VirtualSwap">
                            BNB
                          </div>
                        </div>
                        <span className="mt-3">/</span>
                        <div className="p-1 ">
                          <img
                            src={Virutalcoin}
                            className="img-fluid Virutalcoin"
                            alt=""
                            width={"30px"}
                          />
                        </div>
                        <div className="BNB-VirtualSwap ">
                          Virtual Swap
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ">
                      <div className="row">
                        <div className="col-md-7 responsive-swap-virtual">
                          <h1 className="ms-3 new_swap_text">0.000022</h1>
                          <div className="d-flex align-items-center ms-2 mb-3">
                            <div className="text-value ">-2.22222(-200)</div>
                            <div className="text-coin ms-1">April 08,2022 </div>
                            <div className="text-digit ms-1">9:30am</div>
                          </div>
                        </div>
                        <div className="col-md-5 d-flex justify-content-center align-items-center responsive-swap-button">
                          <div className="btn-group" role="group">
                            <button type="button" className="btn  btn-1 text-white">
                              24H
                            </button>
                            <button type="button" className="btn  btn-2 text-white">
                              1W
                            </button>
                            <button type="button" className="btn  btn-3 text-white">
                              1M
                            </button>
                            <button type="button" className="btn  btn-4 text-white">
                              1Y
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mt-5">
                  <div className="mt-4">
                    <img src={frame} className="img-fluid" alt="" />
                  </div>
                </div>
                <div className="row mt-5 d-flex justify-content-center ">
                  <div className="d-flex justify-content-evenly text-time p-2">
                    <div className="p-2 ">01:00 PM </div>
                    <div className="p-2 ">04:00 PM</div>
                    <div className="p-2 ">07:00 PM</div>
                    <div className="p-2 ">10:00 PM</div>
                    <div className="p-2 ">01:00 AM</div>
                    <div className="p-2 ">05:00 AM</div>
                    <div className="p-2 ">10:05 AM</div>
                  </div>
                </div> */}
                  <SwapGraph />

                  <div className="row mt-2 bo">
                    <div className="col-md-12 col-xl-12 d-flex justify-content-between">
                      <div className="p-2  tbridge">Bridge Asset to BNB Chain </div>
                      <div className="p-2  thelp mb-3">Help?</div>
                    </div>
                  </div>
                </div>
                <div className="swap_3 p-3 mt-3">
                  <div className="d-flex">
                    <button className={active === "one" ? "rout_txt_2" : "rout_txt"}
                      onClick={() => { setRouteActive("one") }}
                    >Route</button>
                    <button className={active === "two" ? "rout_txt_2" : "rout_txt"}
                      onClick={() => { setRouteActive("two") }}
                    >Comparison</button>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="coin_new d-flex">
                      <img
                        src={coin}
                        className="img_swap"
                      />
                      <p className="ms-2 mb-0">0 BUSD</p>
                    </div>
                    <div className="coin_new d-flex">
                      <img
                        src={tlogo}
                        className="img_swap"
                      />
                      <p className="ms-2 mb-0">0 OXT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-xl-6 order-1 order-lg-2  responsive-swap2 justify-content-center align-items-center">
                <div className="minig_sec mb-3 d-flex justify-content-between p-3">
                  <div className="col-lg-6">
                    <div className="pan_text">Trade Mining Rewards</div>
                    <button className="pan_btn">connect</button>
                  </div>
                  <div className="col-lg-6 text-end">
                    <button className="min_btn">Trade Mining
                      <IoIosArrowForward className="ms-1" />
                    </button>


                  </div>
                </div>
                <div className="swap-bg rounded">

                  <div className="row px-3 mt-2 d-flex">

                    <div className="d-flex">
                      <div className="text-start text-white tswap">Swap</div>
                      {/* <div className="text-start tswap2">
                    Trade tokens in an instant
                  </div> */}
                      <AiFillSetting
                        className="diff_clr_two ms-auto mt-1"
                        onClick={handleShowTol}
                        style={{ cursor: "pointer" }}
                      />
                      <ToleranceModal
                        show={showTol}
                        onHide={() => setShowTol(false)}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column px-0 px-lg-3">
                    <div className={`row d-flex justify-content-center mt-2 responsive-swap-input `}>
                      <div className="col-md-12">
                        <div className="ms-auto d-flex">

                          <div className="input-group style_group mt-3"
                            style={{ backgroundColor: "none !important" }}>

                            <input
                              type="text"
                              className="pad height_inp border-0 outline-0"
                              id="basic-url"
                              aria-describedby="basic-addon3"
                              value={valueA}
                              placeholder="0.0"
                              onChange={(e) => {
                                handleChangeA(e.target.value)
                                setFlag(0)
                                setHandleOrder(false)
                              }}
                            />

                            <Button
                              className={
                                tokenA.coin != ""
                                  ? "dropdown-toggle main_btn_small bg-black mb-2 ms-auto rounded"
                                  : "dropdown-toggle main_btn mb-2 ms-auto rounded"
                              }
                              variant="primary"
                              onClick={handleShow}
                              value="Select"
                            >
                              {tokenA.coin != ""
                                ? tokenA.coin
                                : "Select a Token"}
                            </Button>

                            <span className="col-md-12 col-12 balence text-white d-flex justify-content-between ms-auto">

                              {isWalletConnected && tokenA.coin != "" && (
                                <p className="col-md-8 mt-3 fs-10 font">
                                  Balance:
                                  {tokenA.coin != "" && tokenA.coin == nativeCurrency ? (
                                    <> {toPlainString(walletBalance)}</>
                                  ) : (
                                    <>{toPlainString(tokenABalance)}</>
                                  )}
                                </p>
                              )}

                            </span>
                          </div>
                          <TokenAModal show={showA} onHide={() => setShowA(false)} />
                        </div>
                      </div>
                    </div>
                    <div className="row me-4 ">
                      {/* <div className="d-flex justify-content-end me-5 exchange-responsive" onClick={() => { changeOrder(!order) }}>
                      <img
                        src={ExchangeIcon}
                        alt=""
                        className="img-fluid exchangeIcon "
                      />
                    </div> */}
                      <div className="swap_exchange">
                        <div className="text-center text-light fs-4 " onClick={() => { changeOrder(order) }}>
                          {console.log('condation', exchange)}
                          <TbExchange className={exchange ? 'plus_icon_2 fs-5 border-0 bg-transparent exchange' : 'plus_icon_2 fs-5 border-0 bg-transparent'} onClick={handleAnimate} />
                        </div>
                      </div>
                    </div>
                    <div >
                      <div className="row d-flex justify-content-center  responsive-swap-input">
                        <div className="col-md-12">

                          <div className="input-group style_group mt-2 mobile_margin"
                            style={{ backgroundColor: "none !important" }}>

                            <input
                              type="text"
                              className="pad height_inp border-0 outline-0"
                              id="basic-url"
                              aria-describedby="basic-addon3"
                              value={(valueB)}
                              placeholder="0.0"
                              onChange={(e) => {
                                handleChangeB(e.target.value)
                                setFlag(1)
                                setHandleOrder(false)
                              }}
                            />
                            <Button
                              className={
                                tokenB.coin != ""
                                  ? "dropdown-toggle main_btn_small mb-2 ms-auto rounded"
                                  : "dropdown-toggle main_btn mb-2 ms-auto rounded"
                              }
                              variant="primary"
                              onClick={handleShowB}
                              value="Select"
                            >
                              {tokenB.coin != ""
                                ? tokenB.coin
                                : "Select a Token"}
                            </Button>
                            {/* <Button
                            className="bg-dark dropdown-toggle main_btn mb-2 ms-auto"
                            variant="primary"
                            onClick={handleShowB}
                          >
                            {tokenB?.coin}
                          </Button> */}
                            <span className="col-md-12 col-12 balence text-white d-flex justify-content-between ms-auto">
                              {isWalletConnected && tokenB.coin != "" && (
                                <p className="col-md-8 mt-3 fs-10 font">
                                  {tokenB.coin != "" && tokenB.coin == nativeCurrency ? (
                                    <> Balance: {(toPlainString(walletBalance))}</>
                                  ) : (
                                    <>Balance: {(toPlainString(tokenBBalance))}</>
                                  )}
                                </p>
                              )}
                            </span>

                            <TokenBModal show={showB} onHide={() => setShowB(false)} />

                          </div>
                        </div>
                      </div>
                      {/* <div className="row me-4">
                      <div className="d-flex justify-content-end ">
                        <div className="copy-bg text-center CopyIcon">
                          <img
                            src={CopyIcon}
                            className="img-fluid p-2"
                            alt=""
                            width={"40px"}
                          />
                        </div>
                      </div>
                    </div> */}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center responsive-swap-Tsnack">
                    <div className="col-md-10 d-flex justify-content-between ">
                      <div className="tsnack">Snack Risk?</div>
                      <div className="tslippage">
                        Slippage Tolerance{" "}
                        <span className="tslippagevalue"> {slippageTolerance} %</span>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center mt-3">
                    <div className="col-lg-12 col-12">
                      <div className="d-flex justify-content-center align-items-center mt-3">
                        {
                          isWalletConnected ?
                            <button
                              disabled={errorMessage.disable || isTrnsiction}
                              className="d-flex justify-content-center align-items-center swap_btn"
                              onClick={swap}
                            >
                              {/* <div className="btn_conn_icon_bg p-3 text-white">
                              <img
                                src={connection_icon}
                                className="img-fluid"
                                alt=""
                              />
                            </div> */}
                              <div className="">
                                {errorMessage?.btnText}
                              </div>
                            </button> :
                            <button
                              className="col-lg-10 col-10 d-flex justify-content-start align-items-center swap_btn"
                              onClick={connectWallet}
                            >
                              {/* <div className=" p-3 text-white">
                              <img
                                src={connection_icon}
                                className="img-fluid"
                                style={{height:"27px"}}
                                alt=""
                              />
                            </div> */}

                              Connect Wallet

                            </button>
                        }

                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}

export default TradeSwap;
