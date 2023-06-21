import React, { useState } from "react";
import "./Liqudity.css";
import bigInt from "big-integer";
// import coin from "../../Assets/Images/bnb-logo.png";
import SettingICon from "../../../Assets/Images/MaskSetting.png";
import Ticon from "../../../Assets/Images/TimeIcon.png";
// import ExchangeIcon from "../../Assets/Images/Exchange.png";
// import CopyIcon from "../../Assets/Images/Copy.png";
// import connection_icon from "../../../Assets/Images/connection_icon.png";
import Plus from "../../../Assets/Images/plusIcon.png";
import { HashLink } from "react-router-hash-link";
import TradeNavbar from "../Navbar/TradeNavbar";
import { AiOutlineArrowDown, AiOutlineArrowUp, AiFillSetting } from "react-icons/ai";
import Accordion from "./Accordio ";
import { arbiTokenAddress, virtualTokenAddress } from "../../../instances/addresses";
import { createPairInstance, createTokenInstance, factoryContractRef } from "../../../instances/instances";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fromWei } from "../../../constants";
import { web3 } from "../../../wallet";
import ToleranceModal from "../ToleranceModal";
import { getAllPairs } from "../../../Redux/userLiquidity/userLiquidityDataSlice";
import { IoMdArrowRoundBack } from 'react-icons/io'
import API from '../../../client';

function Liqudity() {
  const [showdetail, setShowDetail] = useState(false);
  const [showTol, setShowTol] = useState(false);
  const handleShowTol = () => setShowTol(true);
  // const [userLiquidityInfo, setuserLiquidityInfo] = useState([
  //   {
  //     symbol0: 'VTT',
  //     symbol1: 'ABT',
  //     lpBalance: 0.5000,
  //     tokenZeroBalance: 500000,
  //     tokenOneBalance: 50000,
  //     shareInTradingPair: 50,
  //     rateFromAtoB: 10,
  //     rateFromBtoA: 0.10,
  //     tokenZeroAddress: 'jhjkhsjahdjksd456464564564564654',
  //     tokenOneAddress: 'jkjkljljl56654546s5dsdsdasdsad'
  //   },
  //   {
  //     symbol0: 'VTT',
  //     symbol1: 'ABT',
  //     lpBalance: 0.5000,
  //     tokenZeroBalance: 500000,
  //     tokenOneBalance: 50000,
  //     shareInTradingPair: 50,
  //     rateFromAtoB: 10,
  //     rateFromBtoA: 0.10,
  //     tokenZeroAddress: 'jhjkhsjahdjksd456464564564564654',
  //     tokenOneAddress: 'jkjkljljl56654546s5dsdsdasdsad'
  //   },
  //   {
  //     symbol0: 'VTT',
  //     symbol1: 'ABT',
  //     lpBalance: 0.5000,
  //     tokenZeroBalance: 500000,
  //     tokenOneBalance: 50000,
  //     shareInTradingPair: 50,
  //     rateFromAtoB: 10,
  //     rateFromBtoA: 0.10,
  //     tokenZeroAddress: 'jhjkhsjahdjksd456464564564564654',
  //     tokenOneAddress: 'jkjkljljl56654546s5dsdsdasdsad'
  //   },
  //   {
  //     symbol0: 'VTT',
  //     symbol1: 'ABT',
  //     lpBalance: 0.5000,
  //     tokenZeroBalance: 500000,
  //     tokenOneBalance: 50000,
  //     shareInTradingPair: 50,
  //     rateFromAtoB: 10,
  //     rateFromBtoA: 0.10,
  //     tokenZeroAddress: 'jhjkhsjahdjksd456464564564564654',
  //     tokenOneAddress: 'jkjkljljl56654546s5dsdsdasdsad'
  //   }
  // ]);

  let { userWallet, isWalletConnected, networkStatus } = useSelector((state) => state.connect);
  let { userLiquidityInfo, isUserLiquidityFound } = useSelector((state) => state.userLiquidityInfo);
  const dispatch = useDispatch();

  // const getAllPairs=()=>{
  //   API.get(`getPairs?${address="0xc2E3aDdd10F6C48082Ac8173B864dd304930E6d8"}`)
  // }
  useEffect(() => {
    if (isWalletConnected && networkStatus) {
      dispatch(getAllPairs(userWallet))
    }
  }, [userWallet]);

  return (
    <div className="container">
      <TradeNavbar />
      <div className="row d-flex justify-content-center mb-5 ">
        <div className="col-xl-8 col-lg-8 col-md-8  mt-5">
          <div className="swap-bg ">
            {/* <div className="row d-flex justify-content-end margin-swap">
              <div className="col-xl-4 col-lg-4 col-md-4 col-4 ">
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
                        width={"18px"}
                        alt=""
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div> */}
            <div className="row d-flex justify-content-between p-3">
              <div className=" justify-content-between">
                {/* <IoMdArrowRoundBack className="fs-4" style={{cursor:"pointer"}}/> */}
                <div className="text-white tYour ">
                  Your Liquidity
                </div>
                <div className=" text_trade_token text-white">
                  List of your liquidity positions
                </div>
                {/* Condition */}
                {/* <AiFillSetting
                        className="diff_clr ms-auto mt-1"
                        onClick={handleShowTol}
                        style={{ cursor: "pointer" }}
                      />
                      <ToleranceModal
                        show={showTol}
                        onHide={() => setShowTol(false)}
                      /> */}
              </div>
            </div>
            {
              !isWalletConnected && <div className="row d-flex justify-content-center mt-4 back p-3">
                <div className="col-md-10 d-flex justify-content-center">
                  <div className="text-white">
                    Connect to a wallet to view your liquidity
                  </div>
                </div>
              </div>
            }

            {isWalletConnected && !isUserLiquidityFound ? <div className="text-white text-center mt-3">Loading...</div> : !userLiquidityInfo.length && isWalletConnected ? <div className="text-white text-center mt-3">No Liquidity Found</div> : <>
              <div className="accordian_overflow" style={{ height: isWalletConnected == true ? '400px' : 'auto' }}>

                {

                  userLiquidityInfo.map((item, index) => {
                    return (

                      <div className="mb-3 " key={index}>

                        {isWalletConnected &&

                          <Accordion userInfo={item} i={index} />


                        }
                      </div>

                    )
                  })
                }

              </div>

            </>}




            <div className="row d-flex justify-content-center my-3 col-lg-12 col-12">
              <div className="responsive-liquidity-button ">

                <div className="d-flex justify-content-center align-items-center">
                  <HashLink to="/liqudity_add" className="text-white btn_wid mt-4 mb-3">
                    <button className="d-flex justify-content-center align-items-center w-100 border-0 liquidity_btn">
                      + {""}   Add Liquidity
                    </button>
                  </HashLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Liqudity;
