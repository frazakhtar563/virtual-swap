import React, { useEffect, useState, useMemo } from "react";
// import "./Trade_Swap.css";
import coin from "../../../Assets/Images/bnb-logo.png";
import signalIcon from "../../../Assets/Images/SignalIcon.png";
import SettingICon from "../../../Assets/Images/MaskSetting.png";
import Ticon from "../../../Assets/Images/TimeIcon.png";
import RecycleIcon from "../../../Assets/Images/Recycle.png";
import ExchangeIcon from "../../../Assets/Images/Exchange.png";
import CopyIcon from "../../../Assets/Images/Copy.png";
import { AiOutlinePlus, AiFillSetting } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
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
import { nativeCurrency, walletShortFormer } from "../../../utils";
import { fromWei, toWei, userWalletBal, toPlainString } from "../../../constants";
import {
  virtualRouterAddress,
  wbnbAddress,
} from "../../../instances/addresses";
import API from '../../../client';

import { toast } from "react-toastify";
import { AiOutlineWarning } from "react-icons/ai";
import { walletConnection } from "../../../Redux/userWalletSlice/userWalletSlice";
import { Button, Form } from "react-bootstrap";
import TokenAModal from "./TokenAModal";
import TokenBModal from "./TokenBModal";
import {
  getATokenBalance,
  getBTokenBalance,
  getWalletBalance,
} from "../../../Redux/tokenBalnces/allBalances";
import Web3 from "web3";
import ToleranceModal from "../ToleranceModal";

function AddNewLiquidity() {
  const { tokenABalance, tokenBBalance, walletBalance } = useSelector(
    (state) => state.allBalances
  );
  const [showTol, setShowTol] = useState(false);
  const handleShowTol = () => setShowTol(true);
  const [pairExsist, setpairExsist] = useState(false);
  const [valueA, setValueA] = useState();
  const [valueB, setValueB] = useState();
  const [calculatePercent, setcalculatePercent] = useState();
  const [rateFromAtoB, setrateFromAtoB] = useState();
  const [rateFromBtoA, setrateFromBtoA] = useState();
  const [errorMessage, seterrorMessage] = useState({
    disable: true,
    btnText: "Add Liquidity",
  });
  const [shareInTradingPair, setShareInTradingPair] = useState(0);
  // state to hold the useful data of a pair
  const [pairData, setPairData] = useState({
    reserveA: 0,
    reserveB: 0,
    totalSupply: 0,
  });
  // states to hold approval status for tokens
  const [approvalStatusA, setApprovalStatusA] = useState(false);
  const [approvalStatusB, setApprovalStatusB] = useState(false);
  const [updateStatus, setupdateStatus] = useState(false);
  const [isTrnsiction, setIsTransiction] = useState(false);
  const [pairAddress, setPairAddress] = useState(null);

  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const handleClose = () => setShowA(false);
  const handleShow = () => setShowA(true);
  const handleShowB = () => setShowB(true);

  let { userWallet, isWalletConnected } = useSelector((state) => state.connect);
  let { slippageTolerance } = useSelector((state) => state.setting);

  let { tokenA } = useSelector((state) => state.selectTokenA);
  let { tokenB } = useSelector((state) => state.selectTokenB);
  const dispatch = useDispatch();
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  // let slippageTolerance = 0.5; // @dev: replace this by redux value of slippage tolerance

  const connectWallet = () => {
    dispatch(walletConnection());
  };

  const addLiqudity = async () => {
    try {
      if (
        valueA == null ||
        valueB == null ||
        valueA == undefined ||
        valueB == undefined ||
        valueA == "" ||
        valueB == ""
      ) {
        toast.info("Input fields are mandatory");
        return;
      }
      if (tokenA.coin == nativeCurrency || tokenB.coin == nativeCurrency) {
        let userBal = await userWalletBal(userWallet);
        if (tokenA.coin == nativeCurrency) {
          if (Number(fromWei(userBal)) < Number(valueA)) {
            toast.info(`Insufficient ${nativeCurrency} amount`);
            return;
          }
        }
        else {
          if (Number(fromWei(userBal)) < Number(valueB)) {
            toast.info(`Insufficient ${nativeCurrency} amount`);
            return;
          }
        }
      } else if (
        tokenA.coin != nativeCurrency &&
        tokenB.coin != nativeCurrency
      ) {
        const tokenBInstance = await createTokenInstance(tokenB.address);
        let tokenBBal = await tokenBInstance.methods
          .balanceOf(userWallet)
          .call();

        if (Number(fromWei(tokenBBal)) < Number(valueB)) {

          toast.info(`Insufficient ${tokenB.coin} amount`);
          return;
        }
        const tokenAInstance = await createTokenInstance(tokenA.address);
        let tokenABal = await tokenAInstance.methods
          .balanceOf(userWallet)
          .call();
        if (fromWei(tokenABal) < valueA) {
          toast.info(`Insufficient ${tokenA.coin} amount`);
          return;
        }
      } else if (tokenA.coin != nativeCurrency) {
        const tokenAInstance = await createTokenInstance(tokenA.address);
        let tokenABal = await tokenAInstance.methods
          .balanceOf(userWallet)
          .call();
        if (Number(fromWei(tokenABal)) < Number(valueA)) {

          toast.info(`Insufficient ${tokenA.coin} amount`);
          return;
        }
      } else if (tokenB.coin != nativeCurrency) {

        const tokenBInstance = await createTokenInstance(tokenB.address);
        let tokenBBal = await tokenBInstance.methods
          .balanceOf(userWallet)
          .call();
        if (Number(fromWei(tokenBBal)) < Number(valueB)) {

          toast.info(`Insufficient ${tokenB.coin} amount`);
          return;
        }
      }
      if (tokenA.coin == nativeCurrency) {
        try {
          setIsTransiction(true)
          const amountETHDesired = ((Number(valueA) * 10 ** 18));
          const amountTokenDesired = ((Number(valueB) * 10 ** 18));

          const amountTokenMin = (Math.floor(
            (amountTokenDesired * (100 - slippageTolerance)) / 100
          ));
          const amountETHMin = (Math.floor(
            (amountETHDesired * (100 - slippageTolerance)) / 100
          ));

          console.log('amountETHDesired', toPlainString(amountETHDesired.toFixed(0)));
          console.log('amountETHMin', toPlainString(amountETHMin.toFixed(0)));
          console.log('amountTokenMin', toPlainString(amountTokenMin.toFixed(0)));
          const routerContract = await routerContractRef();
          await routerContract.methods
            .addLiquidityETH(
              tokenB.address,
              toPlainString(amountTokenDesired.toFixed(0)),
              toPlainString(amountTokenMin.toFixed(0)),
              toPlainString(amountETHMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({
              from: userWallet,
              value: toPlainString(amountETHDesired.toFixed(0)),
            })
            .on('receipt', async function (receipt) {
              if (pairExsist) {
                let res = await getApi()
                console.log('res', res)
                console.log('resCondation', !res)
                // console.log('receipt', receipt)
                if (!res) {
                  alert(pairAddress)
                  addNewPair(pairAddress)
                }
              } else {
                let factoryContract = await factoryContractRef();
                let newPair = await factoryContract.methods.getPair(wbnbAddress, tokenB.address).call()
                alert(pairAddress)
                addNewPair(newPair)
              }

            })

          setupdateStatus(!updateStatus);

          toast.success("Liquidity added");
          setValueB('')
          setValueA('')
          getBalanceB()
          getBalanceA()
          setIsTransiction(false)

        } catch (error) {
          setIsTransiction(false)
          console.log('error', error.message)

        }

      } else if (tokenB.coin == nativeCurrency) {
        try {
          setIsTransiction(true)
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
              tokenA.address,
              toPlainString(amountTokenDesired.toFixed(0)),
              toPlainString(amountTokenMin.toFixed(0)),
              toPlainString(amountETHMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({
              from: userWallet,
              value: toPlainString(amountETHDesired.toFixed(0)),
            })
            .on('receipt', async function (receipt) {
              if (pairExsist) {
                let res = await getApi()
                console.log('res', res)
                // console.log('res', receipt)
                if (!res) {
                  addNewPair(pairAddress)
                }
              } else {
                let factoryContract = await factoryContractRef();
                let newPair = await factoryContract.methods.getPair(tokenA.address, wbnbAddress).call()
                addNewPair(newPair)
              }

            })

          setupdateStatus(!updateStatus);

          toast.success("Liquidity Added.");
          setValueB('')
          setValueA('')
          getBalanceB()
          getBalanceA()
          setIsTransiction(false)

        } catch (error) {
          console.log('error', error.message)
          setIsTransiction(false)
        }

      } else {
        try {
          setIsTransiction(true)
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
              tokenA.address,
              tokenB.address,
              toPlainString(amountADesired.toFixed(0)),
              toPlainString(amountBDesired.toFixed(0)),
              toPlainString(amountAMin.toFixed(0)),
              toPlainString(amountBMin.toFixed(0)),
              userWallet,
              Math.floor(Date.now() / 1000) + 300
            )
            .send({ from: userWallet })
            .on('receipt', async function (receipt) {
              if (pairExsist) {
                let res = await getApi()
                console.log('res', res)
                // console.log('res', receipt)
                if (!res) {
                  addNewPair(pairAddress)
                }
              } else {
                let factoryContract = await factoryContractRef();
                let newPair = await factoryContract.methods.getPair(tokenA.address, tokenB.address).call()
                addNewPair(newPair)
              }

            })

          setupdateStatus(!updateStatus);
          toast.success("Liquidity Added.");
          setValueB('')
          setValueA('')
          getBalanceB()
          getBalanceA()

          setIsTransiction(false)

        } catch (error) {
          console.log('error', error.message)
          setIsTransiction(false)

        }

      }
    } catch (error) {
      console.error("error while add liqudity", error);
    }
  };
  const getApi = async () => {
    try {
      let { data } = await API.get(`/getPairExist?address=${userWallet}&pairAddress=${pairAddress}`);

      return data.status
    } catch (e) {
      console.error("error while get api", e);
    }
  }
  const addNewPair = async (pair) => {

    try {
      let obj = {
        userAddress: userWallet,
        token0Address: tokenB.coin == nativeCurrency ? wbnbAddress : tokenB.address,
        token1Address: tokenA.coin == nativeCurrency ? wbnbAddress : tokenA.address,
        token0Symbol: tokenB.coin,
        token1Symbol: tokenA.coin,
      };
      obj.pairAddress = pair

      await API.post("/addPair", obj)
    } catch (error) {
      console.error("error while add new pair", error);
    }
  }
  const getBalanceA = async () => {
    if (tokenA.coin == nativeCurrency) {

      dispatch(getWalletBalance(userWallet));
    } else {
      console.log("getATokenBalance", userWallet);
      dispatch(
        getATokenBalance({
          tokenAddress: tokenA.address,
          userWallet: userWallet,
        })
      );
      dispatch(
        getBTokenBalance({
          tokenAddress: tokenB.address,
          userWallet: userWallet,
        })
      );
    }
  };
  const getBalanceB = async () => {
    if (tokenB.coin == nativeCurrency) {
      dispatch(getWalletBalance(userWallet));
    } else {
      dispatch(
        getBTokenBalance({
          tokenAddress: tokenB.address,
          userWallet: userWallet,
        })
      );
    }
  };

  // function to get pair's data for later use.
  const getPairData = async (pairAddress) => {
    try {
      // let wbnContract = await WBNBContractRef();
      console.log("value in reserve", pairAddress);

      if (!(pairAddress === ZERO_ADDRESS)) {
        let pairContract = await createPairInstance(pairAddress);

        // arrange the reserves
        let token0 = await pairContract.methods.token0().call();
        let isArranged = token0 === tokenA.address;

        // get reserves from contract.
        let { _reserve0, _reserve1 } = await pairContract.methods
          .getReserves()
          .call();
        let _totalSupply = await pairContract.methods.totalSupply().call();

        // setting rates and supply accoriding to the arrangement.
        let _rateFromAtoB, _rateFromBtoA;
        if (isArranged) {
          _rateFromBtoA = fromWei(_reserve0) / fromWei(_reserve1);
          _rateFromAtoB = fromWei(_reserve1) / fromWei(_reserve0);
          setPairData({
            reserveA: _reserve0,
            reserveB: _reserve1,
            totalSupply: _totalSupply,
          });
        } else {
          // if is not arranged
          _rateFromBtoA = _reserve1 / _reserve0;
          _rateFromAtoB = _reserve0 / _reserve1;

          console.log("_rateFromAtoB", toPlainString(_rateFromAtoB));
          setPairData({
            reserveA: _reserve1,
            reserveB: _reserve0,
            totalSupply: _totalSupply,
          });
        }
        setrateFromAtoB(toPlainString(_rateFromAtoB));
        setrateFromBtoA(toPlainString(_rateFromBtoA));
      } else {


        setrateFromAtoB("");
        setrateFromBtoA("");
      }
    } catch (error) {
      console.log("error while get reserve", error);
    }
  };

  // function to set values of A fields.
  // This function will be called when value will be entered while pressing percent buttons.
  const setValueAFromPercent = async (percent) => {
    if (percent === "MAX") {
      if (tokenA.coin === nativeCurrency) {
        setValueA(walletBalance);
        if (pairExsist) {
          setValueB(walletBalance * rateFromAtoB);
          if (isWalletConnected) {
            setApprovalStatusOfB(walletBalance * rateFromAtoB);
          }
          setShareOfTradingPair(walletBalance, walletBalance * rateFromAtoB);
          if (Number(walletBalance * rateFromAtoB) > Number(tokenBBalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenB.coin} Balance`,
            });
          } else {
            seterrorMessage({
              ...errorMessage,
              disable: false,
              btnText: `Add Liquidity`,
            });
          }
        }
      } else {
        // token A not BNB
        setValueA(tokenABalance);
        if (isWalletConnected) {
          setApprovalStatusOfA(tokenABalance);
        }
        if (pairExsist) {
          setValueB(tokenABalance * rateFromAtoB);
          if (tokenB.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfB(tokenABalance * rateFromAtoB);
          }
          setShareOfTradingPair(tokenABalance, tokenABalance * rateFromAtoB);
          if (tokenB.coin === nativeCurrency) {
            if (Number(tokenABalance * rateFromAtoB) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          } else {
            // token b is not BNB
            if (Number(tokenABalance * rateFromAtoB) > Number(tokenBBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
      }
    } else {
      // percent is not max
      if (tokenA.coin === nativeCurrency) {
        let result = (walletBalance * Number(percent)) / 100;
        setValueA(result);
        if (pairExsist) {
          setValueB(result * rateFromAtoB);
          if (isWalletConnected) {
            setApprovalStatusOfB(result * rateFromAtoB);
          }
          setShareOfTradingPair(result, result * rateFromAtoB);
          if (Number(result * rateFromAtoB) > Number(tokenBBalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenB.coin} Balance`,
            });
          } else {
            seterrorMessage({
              ...errorMessage,
              disable: false,
              btnText: `Add Liquidity`,
            });
          }
        }
      } else {
        // token A not BNB
        let result = (tokenABalance * Number(percent)) / 100;
        setValueA(result);
        if (isWalletConnected) {
          setApprovalStatusOfA(result);
        }
        if (pairExsist) {
          setValueB(result * rateFromAtoB);
          if (tokenB.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfB(result * rateFromAtoB);
          }
          setShareOfTradingPair(result, result * rateFromAtoB);
          if (tokenB.coin === nativeCurrency) {
            if (Number(result * rateFromAtoB) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          } else {
            // token b is not bnb
            if (Number(result * rateFromAtoB) > Number(tokenBBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
      }
    }
  };

  // function to set values of B fields.
  // This function will be called when value will be entered while pressing percent buttons.
  const setValueBFromPercent = async (percent) => {

    if (percent === "MAX") {
      if (tokenB.coin === nativeCurrency) {
        setValueB(walletBalance);
        if (pairExsist) {
          setValueA(walletBalance * rateFromBtoA);
          if (isWalletConnected) {
            setApprovalStatusOfA(walletBalance * rateFromBtoA);
          }
          setShareOfTradingPair(walletBalance * rateFromBtoA, walletBalance);
          if (Number(walletBalance * rateFromBtoA) > Number(tokenABalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenA.coin} Balance`,
            });
          } else {
            seterrorMessage({
              ...errorMessage,
              disable: false,
              btnText: `Add Liquidity`,
            });
          }
        }
      } else {
        //need to handle error
        toast('else')
        // token B not BNB
        setValueB(tokenBBalance);
        if (isWalletConnected) {
          setApprovalStatusOfB(tokenBBalance);
        }
        if (pairExsist) {

          setValueA(tokenBBalance * rateFromBtoA);
          if (tokenA.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfA(tokenBBalance * rateFromBtoA);
          }
          setShareOfTradingPair(tokenBBalance * rateFromBtoA, tokenBBalance);
          if (tokenA.coin === nativeCurrency) {
            // console.log('Number(tokenBBalance * rateFromBtoA) > Number(walletBalance)', Number(tokenBBalance * rateFromBtoA) > Number(walletBalance))
            if (Number(tokenBBalance * rateFromBtoA) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          } else {
            // token b is not BNB
            if (Number(tokenBBalance * rateFromBtoA) > Number(tokenABalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
        else {
          // toast.error('Pair not exist')
        }
      }
    }
    else {

      // percent is not max
      if (tokenB.coin === nativeCurrency) {
        let result = (walletBalance * Number(percent)) / 100;
        setValueB(result);
        if (pairExsist) {
          setValueA(result * rateFromBtoA);
          if (isWalletConnected) {
            setApprovalStatusOfA(result * rateFromBtoA);
          }
          setShareOfTradingPair(result * rateFromBtoA, result);
          if (Number(result * rateFromBtoA) > Number(tokenABalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenA.coin} Balance`,
            });
          } else {
            seterrorMessage({
              ...errorMessage,
              disable: false,
              btnText: `Add Liquidity`,
            });
          }
        }
      } else {
        // token B not BNB

        let result = (tokenBBalance * Number(percent)) / 100;
        setValueB(result);
        if (isWalletConnected) {
          setApprovalStatusOfB(result);
        }
        if (pairExsist) {
          setValueA(result * rateFromBtoA);
          if (tokenA.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfA(result * rateFromBtoA);
          }
          setShareOfTradingPair(result * rateFromBtoA, result);
          if (tokenB.coin === nativeCurrency) {
            if (Number(result * rateFromBtoA) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          } else {
            if (Number(result * rateFromBtoA) > Number(tokenABalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
        else {
          toast('pair not exisit')
        }
      }
    }
  };

  // function to set values of A fields.
  // This function will be called when values will be entered manually in the A field
  const setValuesForA = async (_value) => {
    console.log('ispair', pairExsist)
    let flag = false;
    if (_value == 0) {
      setValueA(_value);
      if (pairExsist) {

        setValueB('')
      }
    }
    else {

      setValueA(_value);
      if (tokenA.coin === nativeCurrency) {
        if (Number(_value) > walletBalance) {
          flag = true;
          seterrorMessage({
            ...errorMessage,
            disable: true,
            btnText: `insuffcient ${tokenA.coin} Balance`,
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            disable: false,
            btnText: `Add Liquidity`,
          });
        }
        if (pairExsist) {
          setValueB(toPlainString(_value * rateFromAtoB));
          if (isWalletConnected) {
            setApprovalStatusOfB(_value * rateFromAtoB);
          }
          setShareOfTradingPair(_value, _value * rateFromAtoB);
          if (Number(_value * rateFromAtoB) > Number(tokenBBalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenB.coin} Balance`,
            });
          } else {
            if (!flag) {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
      } else {
        // if token a is not bnb
        if (isWalletConnected) {
          setApprovalStatusOfA(_value);
        }
        let flag = false;
        if (Number(_value) > tokenABalance) {
          flag = true;
          seterrorMessage({
            ...errorMessage,
            disable: true,
            btnText: `insuffcient ${tokenA.coin} Balance`,
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            disable: false,
            btnText: `Add Liquidity`,
          });
        }
        if (pairExsist) {
          setValueB(toPlainString(_value * rateFromAtoB));
          if (tokenB.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfB(_value * rateFromAtoB);
          }
          setShareOfTradingPair(_value, _value * rateFromAtoB);
          if (tokenB.coin === nativeCurrency) {
            if (Number(_value * rateFromAtoB) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              if (!flag) {
                seterrorMessage({
                  ...errorMessage,
                  disable: false,
                  btnText: `Add Liquidity`,
                });
              }
            }
          } else {
            // token b is not bnb
            if (Number(_value * rateFromAtoB) > Number(tokenBBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenB.coin} Balance`,
              });
            } else {
              if (!flag) {
                seterrorMessage({
                  ...errorMessage,
                  disable: false,
                  btnText: `Add Liquidity`,
                });
              }
            }
          }
        }
      }
    }

    // if (Number(_value) > Number(balanceA)) {
    //   toast.error(`value is greater then${balanceA}`);
    //   setbtnText(`Insufficient ${tokenA.coin} Balance`);
    // }

  };

  // function to set values of B fields.
  // This function will be called when values will be entered manually in the B field
  const setValuesForB = async (_value) => {

    let flag = false;
    if (_value == 0) {
      setValueB(_value);
      if (pairExsist) {

        setValueA('')
      }

    }
    else {
      setValueB(_value);
      if (tokenB.coin === nativeCurrency) {
        if (Number(_value) > walletBalance) {
          flag = true;
          seterrorMessage({
            ...errorMessage,
            disable: true,
            btnText: `insuffcient ${tokenB.coin} Balance`,
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            disable: false,
            btnText: `Add Liquidity`,
          });
        }
        if (pairExsist) {
          setValueA(toPlainString(_value * rateFromBtoA));
          if (isWalletConnected) {
            setApprovalStatusOfA(_value * rateFromBtoA);
          }
          setShareOfTradingPair(_value * rateFromBtoA, _value);
          if (Number(_value * rateFromBtoA) > Number(tokenABalance)) {
            seterrorMessage({
              ...errorMessage,
              disable: true,
              btnText: `insuffcient ${tokenA.coin} Balance`,
            });
          } else {
            if (!flag) {
              seterrorMessage({
                ...errorMessage,
                disable: false,
                btnText: `Add Liquidity`,
              });
            }
          }
        }
      } else {
        // if token a is not bnb
        if (isWalletConnected) {
          setApprovalStatusOfB(_value);
        }
        let flag = false;
        if (Number(_value) > tokenBBalance) {

          flag = true;
          seterrorMessage({
            ...errorMessage,
            disable: true,
            btnText: `insuffcient ${tokenB.coin} Balance`,
          });
        } else {
          seterrorMessage({
            ...errorMessage,
            disable: false,
            btnText: `Add Liquidity`,
          });
        }
        if (pairExsist) {
          console.log('_value * rateFromBtoA', _value * rateFromBtoA)
          setValueA(toPlainString(_value * rateFromBtoA));

          if (tokenA.coin !== nativeCurrency && isWalletConnected) {
            setApprovalStatusOfA(_value * rateFromBtoA);
          }
          setShareOfTradingPair(_value * rateFromBtoA, _value);
          if (tokenA.coin === nativeCurrency) {
            if (Number(_value * rateFromBtoA) > Number(walletBalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              if (!flag) {
                seterrorMessage({
                  ...errorMessage,
                  disable: false,
                  btnText: `Add Liquidity`,
                });
              }
            }
          } else {
            // token b is not bnb
            if (Number(_value * rateFromBtoA) > Number(tokenABalance)) {
              seterrorMessage({
                ...errorMessage,
                disable: true,
                btnText: `insuffcient ${tokenA.coin} Balance`,
              });
            } else {
              if (!flag) {
                seterrorMessage({
                  ...errorMessage,
                  disable: false,
                  btnText: `Add Liquidity`,
                });
              }
            }
          }
        }
        else {
          // toast.error('pair does not exisit')



        }
      }
    }


  };

  // function to get pair address.
  // if pair didn't exist, it will return zero address.
  const getPair = async () => {
    let factory = await factoryContractRef();
    let pairAddress;
    if (tokenA.coin === nativeCurrency) {
      pairAddress = await factory.methods
        .getPair(wbnbAddress, tokenB.address)
        .call();

    } else if (tokenB.coin === nativeCurrency) {
      pairAddress = await factory.methods
        .getPair(tokenA.address, wbnbAddress)
        .call();


    } else {
      pairAddress = await factory.methods
        .getPair(tokenA.address, tokenB.address)
        .call();
    }


    if (pairAddress === ZERO_ADDRESS) {
      return ZERO_ADDRESS;
    } else {
      return pairAddress;
    }
  };

  // const reduceValueB = async () => {
  //   setValueB(balanceA * rateFromAtoB);
  //   seterrorMessage(null);
  // };

  const setButtonStatus = async () => {
    if (tokenA.coin === nativeCurrency) {
      if (userWallet == 0) {
        seterrorMessage({
          ...errorMessage,
          disable: true,
          btnText: `insuffcient ${tokenA.coin} Balance`,
        });
      } else {
        seterrorMessage({
          ...errorMessage,
          disable: false,
          btnText: `Enter Value`,
        });
      }
    } else {
      // if token a not bnb
      if (tokenABalance == 0) {
        seterrorMessage({
          ...errorMessage,
          disable: true,
          btnText: `insuffcient ${tokenA.coin} Balance`,
        });
      } else {
        seterrorMessage({
          ...errorMessage,
          disable: false,
          btnText: `Enter Value`,
        });
      }
    }
    if (tokenB.coin === nativeCurrency) {

      if (userWallet == 0) {
        seterrorMessage({
          ...errorMessage,
          disable: true,
          btnText: `insuffcient ${tokenB.coin} Balance`,
        });
      } else {
        seterrorMessage({
          ...errorMessage,
          disable: false,
          btnText: `Enter Value`,
        });
      }
    } else {
      console.log('tokenBBalance', tokenBBalance)
      // if token b not bnb
      if (tokenBBalance == 0) {
        seterrorMessage({
          ...errorMessage,
          disable: true,
          btnText: `insuffcient ${tokenB.coin} Balance`,
        });
      } else {
        seterrorMessage({
          ...errorMessage,
          disable: false,
          btnText: `Enter Value`,
        });
      }
    }
  };
  let towei = 10 ** 18;
  // function to calculate share in tranding pair.
  const setShareOfTradingPair = async (_valueA, _valueB) => {
    let liqudityA =
      (_valueA * towei * pairData.totalSupply) / pairData.reserveA;
    let liqudityB =
      (_valueB * towei * pairData.totalSupply) / pairData.reserveB;
    const liqudity = liqudityA < liqudityB ? liqudityA : liqudityB;

    let _totalSupply = Number(pairData.totalSupply) + Number(liqudity);

    let share = (liqudity / _totalSupply) * 100;

    setShareInTradingPair(share.toFixed(2));
  };

  // function to enable button for approval of A tokens if needed
  const setApprovalStatusOfA = async (_valueA) => {
    let tokenAContract = await createPairInstance(tokenA.address);
    let allowance = await tokenAContract.methods
      .allowance(userWallet, virtualRouterAddress)
      .call();
    console.log("approval: value a ", _valueA);
    console.log("approval; allowance a", allowance);
    if (Number(allowance) < _valueA * towei) {
      setApprovalStatusA(true);
      seterrorMessage({
        ...errorMessage,
        disable: true,
        btnText: `Enable first`,
      });
    }
  };
  // function to enable button for approval of token B if needed.
  const setApprovalStatusOfB = async (_valueB) => {
    let tokenBContract = await createPairInstance(tokenB.address);
    let allowance = await tokenBContract.methods
      .allowance(userWallet, virtualRouterAddress)
      .call();
    console.log("approval: value b ", _valueB);
    console.log("approval; allowance b", allowance);
    if (Number(allowance) < _valueB * towei) {
      setApprovalStatusB(true);
      seterrorMessage({
        ...errorMessage,
        disable: true,
        btnText: `Enable first`,
      });
    }
  };

  // function to approve token A to router
  // this function will be called while pressing Enable tokenA.coin button.
  const approveForTokenAToRouter = async () => {
    let tokenAContract = await createTokenInstance(tokenA.address);
    let approveTx = await tokenAContract.methods
      .approve(
        virtualRouterAddress,
        Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1))
      )
      .send({ from: userWallet });
    toast.success("Approved Successfully to router");
    seterrorMessage({
      ...errorMessage,
      disable: false,
      btnText: `Add Liquidity`,
    });
    setApprovalStatusA(false);
  };

  // function to approve token B to router
  // this function will be called while pressing Enable tokenB.coin button.
  const approveForTokenBToRouter = async () => {
    let tokenBContract = await createTokenInstance(tokenB.address);
    let approveTx = await tokenBContract.methods
      .approve(
        virtualRouterAddress,
        Web3.utils.toBN(2).pow(Web3.utils.toBN(256)).sub(Web3.utils.toBN(1))
      )
      .send({ from: userWallet });
    toast.success("Approved Successfully to router");
    seterrorMessage({
      ...errorMessage,
      disable: false,
      btnText: `Add Liquidity`,
    });
    setApprovalStatusB(false);
  };

  useEffect(() => {
    const myfun = async () => {
      if (tokenA.coin != "" && tokenB.coin != "") {
        let pairAddress = await getPair();
        await getPairData(pairAddress);
        setPairAddress(pairAddress)
        console.log('pairexist', pairAddress)
        console.log('pairexistcondation', !(pairAddress === ZERO_ADDRESS))
        setpairExsist(!(pairAddress === ZERO_ADDRESS));
      }

      if (isWalletConnected) {
        if (tokenA.coin != "") {
          await getBalanceA();
        }
        if (tokenB.coin != "") {
          await getBalanceB();
        }
        // await setButtonStatus();
      }
    };
    myfun();
  }, [tokenA, tokenB, userWallet, updateStatus]);

  return (
    <div className="container-fluid w-100 liqui_bg">
      <div className="row d-flex justify-content-center mb-2 ">
        <div className="col-md-12 mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-5 col-lg-5 col-md-5 col-12 responsive-swap2">
              <div className="swap-bg p-2 col-12 mb-5">
                <div className="row d-flex justify-content-between margin-swap">
                  {/* <div className="col-md-12">
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
                  </div> */}
                </div>
                <div className="container mt-3">
                  <HashLink
                    to="/trade_liqudity"
                    className="text-white text_btn"
                  >
                    <IoMdArrowRoundBack
                      className="fs-4 text-start"
                      style={{ cursor: "pointer" }}
                    />
                  </HashLink>
                  <div className="row d-flex">
                    <div className="d-flex  justify-content-between">
                      <div className="text-white text-start tYour ">
                        Liquidity
                      </div>
                      {/* <div className="text-center text_trade_token text-white">
                      Trade tokens in an instant
                    </div> */}
                      {/* Condition */}
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
                    <div className="col-lg-12">
                      {!pairExsist && (
                        <div className="border_inner text-white p-2 border border-warning error_bg">
                          <div className="d-flex">
                            <div class="mt-2">
                              <AiOutlineWarning
                                style={{
                                  color: "yellow",
                                  width: "23px",
                                  height: "23px",
                                }}
                              />{" "}
                            </div>
                            <div className="col-lg-12 col-md-12 flex-column">
                              <h5 className="pro_font mt-1">
                                You are the first liquidity provider
                              </h5>
                              <p className="mb-1 font_para">
                                The ratio of tokens you add will set the price
                                of this pair.Once you are happy with the rate
                                click supply to review
                              </p>
                              {/* <p className="font_para">
                        
                      </p> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12 mt-3 col-12">
                    <TokenAModal className="margin_none" show={showA} onHide={() => setShowA(false)} />

                    <div
                      className="input-group style_group flex-nowrap justify-content-between"
                      style={{ backgroundColor: "none !important" }}
                    >
                      <input
                        type="number"
                        className="pad height_inp border-0 outline-0"
                        aria-describedby="basic-addon3"
                        value={valueA}
                        placeholder="0.0"
                        onChange={(e) => {
                          setValuesForA(e.target.value);
                        }}
                      />
                      <div className="">
                        <Button
                          className={
                            tokenA.coin != ""
                              ? "dropdown-toggle main_btn_small bg-black"
                              : "dropdown-toggle main_btn"
                          }
                          variant="primary"
                          onClick={handleShow}
                          value="Select"
                        >
                          {tokenA.coin != ""
                            ? tokenA.coin
                            : "Select a Token"}
                        </Button>
                      </div>

                      <div className="col-md-12 col-12 balence d-flex justify-content-between ms-auto">
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

                        {tokenA.coin != "" && (
                          <div className="ms-auto mt-2 margin_ri8">
                            <div className="d-flex m-1 ms-auto justify-content-end mb-2">
                              {[25, 50, 75, "MAX"].map((item, index, arr) => {
                                return (
                                  <button
                                    key={index}
                                    className="input_btn ms-auto"
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
                        )}
                      </div>
                    </div>

                    <div className="text-center text-light fs-4">
                      <AiOutlinePlus className="plus_icon fs-5" />
                    </div>

                    <div
                      className="input-group style_group mt-2 flex-nowrap justify-content-between"
                      style={{ backgroundColor: "none !important" }}
                    >
                      {/* <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span> */}
                      <input
                        type="number"
                        className="pad height_inp border-0 outline-0"
                        aria-describedby="basic-addon3"
                        value={valueB}
                        placeholder="0.0"
                        onChange={(e) => {
                          setValuesForB(e.target.value);
                        }}
                      />
                      <div className="">
                        <TokenBModal
                          show={showB}
                          onHide={() => setShowB(false)}
                        />
                        <Button
                          className={
                            tokenB.coin != ""
                              ? "dropdown-toggle main_btn_small"
                              : "dropdown-toggle main_btn"
                          }
                          variant="primary"
                          onClick={handleShowB}
                          value="Select"
                        >
                          {tokenB.coin != ""
                            ? tokenB.coin
                            : "Select a Token"}
                        </Button>
                      </div>

                      <div className="col-md-12 col-12 balence d-flex justify-content-between ms-auto">
                        {isWalletConnected && tokenB.coin != "" && (
                          <p className="col-md-8 mt-3 fs-10 font">
                            {tokenB.coin != "" && tokenB.coin == nativeCurrency ? (
                              <> Balance: {toPlainString(walletBalance)}</>
                            ) : (
                              <>Balance: {toPlainString(tokenBBalance)}</>
                            )}
                          </p>
                        )}

                        {tokenB.coin != "" && (
                          <div className="ms-auto mt-2 margin_ri8">
                            <div className="d-flex m-1 ms-auto justify-content-end">
                              {[25, 50, 75, "MAX"].map((item, index, arr) => {
                                return (
                                  <button
                                    key={index}
                                    className="input_btn ms-auto"
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
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      {pairExsist ? (
                        <div className="row p-1 d-flex m-2" style={{ border: "1px solid rgb(76, 79, 95)" }}>
                          {/* <h5 className="text-white">Price and Share</h5> */}
                          {/* <hr /> */}
                          <div className="d-flex main_price_res justify-content-between">
                            <div className="text-center res_pair">
                              <p className="text-white mb-0">{(rateFromAtoB)}</p>
                              <p className="text-white mb-0">
                                {tokenB.coin} per {tokenA.coin}
                              </p>
                            </div>

                            <div className="text-center text-white mb-0 res_pair">

                              <p className=" mb-0">{(rateFromBtoA)}</p>
                              <p className="">
                                {tokenA.coin} per {tokenB.coin}
                              </p>
                            </div>

                            <div className="text-center text-white res_pair">

                              <p className=" mb-0">{`${shareInTradingPair}%`}</p>
                              <p className=" mb-0">Share in trading pair</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row p-1 d-flex m-2" style={{ border: "1px solid rgb(76, 79, 95)" }}>
                          {/* <h5 className="text-white">Price and Share</h5> */}
                          {/* <hr /> */}
                          <div className="d-flex justify-content-between">
                            <div className="text-center">

                              <p className="text-white text-center mb-0">

                                {typeof valueA !== "undefined" &&
                                  typeof valueB !== "undefined" &&
                                  valueA !== 0 &&
                                  valueB !== 0
                                  ? (Number(valueB / valueA).toLocaleString('fullwide', { useGrouping: false }))
                                  : "-"}
                              </p>
                              <p className="text-white mb-0">
                                {tokenB.coin} per {tokenA.coin}
                              </p>
                            </div>

                            <div className=" text-white text-center">
                              <p className="mb-0">
                                {typeof valueA !== "undefined" &&
                                  typeof valueB !== "undefined" &&
                                  valueA !== 0 &&
                                  valueB !== 0
                                  ? toPlainString(Number(valueA / valueB))
                                  : "-"}
                              </p>
                              <p className=" mb-0">
                                {tokenA.coin} per {tokenB.coin}
                              </p>
                            </div>

                            <div className="mb-0 text-white text-center">
                              <p className="mb-0">100%</p>
                              <p className="mb-0">Share in trading pair</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* <div className="d-flex">
                      <Button
                        className="bg-dark dropdown-toggle main_btn"
                        variant="primary"
                        onClick={handleShowB}
                      >
                        {tokenB.coin}
                      </Button>
                      <div className="ms-auto">
                        <p className="text-white mt-3 me-auto fs-10 font ms-auto">
                          Balance:
                          {tokenB.coin == nativeCurrency
                            ? walletBalance
                            : tokenBBalance}
                        </p>
                        <TokenBModal
                          show={showB}
                          onHide={() => setShowB(false)}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <img src={coin} className="img-fluid p-1" alt="" />
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        aria-describedby="basic-addon3"
                        value={valueB}
                        placeholder="0.0"
                        onChange={(e) => {
                          setValuesForB(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div className="d-flex m-1 me-auto justify-content-end">
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
                    <div className="text-end copy_icon">
                      <img
                        src={CopyIcon}
                        className="img-fluid "
                        width={"20px"}
                        alt=""
                      />
                    </div> */}

                    {errorMessage?.priceImpactHigh}
                  </div>
                </div>

                {isWalletConnected ? (
                  <div className="row d-flex justify-content-center mt-3">
                    <div className="col-md-12 col-12 px-lg-4">
                      {/* {console.log('disabled', valueA.length == undefined ? true : false)} */}
                      <button
                        className="connect_button"
                        disabled={errorMessage.disable || !valueA || !valueB || isTrnsiction}
                        onClick={addLiqudity}
                      >
                        {errorMessage.btnText}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="row d-flex justify-content-center mt-3 mb-2 px-lg-3"
                    onClick={connectWallet}
                  >
                    <div className="col-md-12 col-12 ">
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
                <div className="d-flex justify-content-between m-2 mt-3">
                  {isWalletConnected && approvalStatusA && (
                    <div className="row d-flex justify-content-center">
                      <div className="col-md-12 col-12 mt-2">
                        <div className=" d-flex justify-content-around">
                          <div>
                            <button
                              className="enable_btn btn-block btn_enable"
                              type="button"
                              onClick={approveForTokenAToRouter}
                            >
                              Enable {tokenA.coin}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isWalletConnected && approvalStatusB && (
                    <div className="row d-flex justify-content-center ">
                      <div className="col-md-12 col-12 mt-2">
                        <div className=" d-flex justify-content-around">
                          <div>
                            <button
                              className="enable_btn btn-block btn_enable"
                              type="button"
                              onClick={approveForTokenBToRouter}
                            >
                              Enable {tokenB.coin}
                            </button>
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
export default AddNewLiquidity;