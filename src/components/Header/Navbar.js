import React from "react";
import toggle from "../../Assets/toggle.png";
import "./Navbar.css";
import navbarLogo from "../../Assets/navbar_logo.png";
import lines from "../../Assets/Images/Group1.png";
import profile_icon from "../../Assets/Images/uu7.png";
import language_icon from "../../Assets/Images/Maskgroup.png";
import setting_icon from "../../Assets/Images/SettingIcon.png";
import BnbIcon from "../../Assets/Images/BnbIcon.png";
import connection_icon from "../../Assets/Images/connection_icon.png";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { walletConnection } from "../../Redux/userWalletSlice/userWalletSlice";
import { useSelector } from "react-redux";
import { walletShortFormer } from "../../utils";
import { FiMoreHorizontal } from "react-icons/fi";
import Dropdown from 'react-bootstrap/Dropdown';

// import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillSetting, AiFillSketchCircle } from "react-icons/ai";
import SettingModal from "./SettingModal";
import { switchNetwork } from "../../wallet";
// import SettingModal from "./SettingModal";
import virtualIcon01 from '../../Assets/VirtualIcon/virtualIcon01.png'
import LimitIcon from '../../Assets/VirtualIcon/LimitIcon.png'
import SpotIcon from '../../Assets/VirtualIcon/SpotIcon.png'
import virtualIcon10 from '../../Assets/VirtualIcon/virtualIcon10.png'
import Farms from '../../Assets/VirtualIcon/Farms.png'
import Pool from '../../Assets/VirtualIcon/Pool.png'
import CompetitionIcon from '../../Assets/VirtualIcon/CompetitionIcon.png'
import PredictionIcon from '../../Assets/VirtualIcon/PredictionIcon.png'
import PotteryIcon from '../../Assets/VirtualIcon/PotteryIcon.png'
import virtualBondIcon from '../../Assets/VirtualIcon/virtualBondIcon.png'
import overviewIcon from '../../Assets/VirtualIcon/overviewIcon.png'
import collectionIcon from '../../Assets/VirtualIcon/collectionIcon.png'
import activity from '../../Assets/VirtualIcon/activity.png'
import virtualIcon12 from '../../Assets/VirtualIcon/virtualIcon12.png'
import legendUserIcon from '../../Assets/VirtualIcon/legendUserIcon.png'
import virtualIcon08 from '../../Assets/VirtualIcon/virtualIcon08.png'
import virtualIcon14 from '../../Assets/VirtualIcon/virtualIcon14.png'
import LeadBoardIcon from '../../Assets/VirtualIcon/LeadBoardIcon.png'
import virtualIcon13 from '../../Assets/VirtualIcon/virtualIcon13.png'
import virtualIcon07 from '../../Assets/VirtualIcon/virtualIcon07.png'
import IfoIcon from '../../Assets/VirtualIcon/IfoIcon.png'
import virtualIcon09 from '../../Assets/VirtualIcon/virtualIcon09.png'
import votingIcon from '../../Assets/VirtualIcon/votingIcon.png'
import virtualIcon11 from '../../Assets/VirtualIcon/virtualIcon11.png'
import virtualIcon03 from '../../Assets/VirtualIcon/virtualIcon03.png'

function Navbar(props) {
  const dispatch = useDispatch();
  let { userWallet, isWalletConnected, networkStatus } = useSelector((state) => state.connect);
  const [iscolor, setIsColor] = useState("Farms");
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  // const [showContent, setShowContent] = useState(false);
  // const [showContent1, setShowContent1] = useState(false);
  // const [showContent2, setShowContent2] = useState(false);
  // const [showContent3, setShowContent3] = useState(false);
  // const [showContent4, setShowContent4] = useState(false);
  // const [showContent5, setShowContent5] = useState(false);
  const { pathname } = useLocation();
  // const [showBack,setShowBack] = useState("");
  const changePath = () => {
    if (pathname) {
      console.log("pathname", pathname);
      if (pathname == "/Trade_Swap") {
        setIsColor("Trade");
      } else if (pathname == "/") {
        setIsColor("");
      } 
      // else if (pathname == "/trade_limit") {
      //   setIsColor("Limit");
      // }
       else if (pathname == "/trade_liqudity") {
        setIsColor("Liqudity");
      } else if (pathname == "/farms") {
        setIsColor("Earn");
      } else if (pathname == "/pool") {
        setIsColor("Pool");
      } else if (pathname == "/Win_latest") {
        setIsColor("Win");
      } else if (pathname == "/Win_prediction") {
        setIsColor("Prediction");
      } else if (pathname == "/Win_lottery") {
        setIsColor("Virtual Bond");
      } else if (pathname == "/Win_pottery") {
        setIsColor("Pottery");
      } else if (pathname == "/Nft_overview") {
        setIsColor("Nft");
      } else if (pathname == "/Nft_overview") {
        setIsColor("OverView");
      } else if (pathname == "/Nft_collection") {
        setIsColor("Collection");
      } else if (pathname == "/Nft_activity") {
        setIsColor("Activity");
      } else if (pathname == "/Virtual_Event") {
        setIsColor("Virtual Event");
      } else if (pathname == "/legend_user") {
        setIsColor("Legend User");
      } else if (pathname == "/jackpot") {
        setIsColor("Jackpot");
      } else if (pathname == "") {
        setIsColor("Leader Board");
      } else if (pathname == "/info_swap") {
        setIsColor("Info");
      } else if (pathname == "/ifo_latest") {
        setIsColor("Ifo");
      } else if (pathname == "") {
        setIsColor("Voting");
      } else if (pathname == "/referral") {
        setIsColor("Referral");
      } else if (pathname == "/Trade_league") {
        setIsColor("Trade League");
      } else if (pathname == "/tokenomic") {
        setIsColor("Tokenomics");
      } else if (pathname == "/launchPad") {
        setIsColor("Launch Pad");
      } else if (pathname == "/virtualGallery") {
        setIsColor("Virtual Gallery");
      } else if (pathname == "/spot") {
        setIsColor("Spot");
      }
    }
  };

  const handleClose = () => setShow(false);

  const connectWallet = () => {

    dispatch(walletConnection());
  };


  useEffect(() => {

    window.ethereum.on('accountsChanged', function (accounts) {

      dispatch(walletConnection());
      // Time to reload your interface with accounts[0]!
    })
    window.ethereum.on('networkChanged', function (networkId) {
      // Time to reload your interface with the new networkId

      if ((networkId != 97 && isWalletConnected) || (networkId == 97 && isWalletConnected)) {

        switchNetwork(97)
      }
    })
  }, [isWalletConnected])
  useEffect(() => {
    changePath();
  }, [pathname]);
  const [theme, setTheme] = useState("");
  const toggleThem = () => {
    if (theme === "dark-theme") {
      localStorage.setItem("theme", "light-theme");
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("theme") == null) {
      document.body.className = "dark-theme";
      localStorage.setItem("theme", "dark-theme");
      setTheme("dark-theme");
    } else {
      document.body.className = localStorage.getItem("theme");
      setTheme(localStorage.getItem("theme"));
    }
  }, [theme]);


  return (
    <>
      <div className="container-fluid p-0">
        <div className="row w-100">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg ">
              <div className="container-fluid">
                {/* MOBILE CONNECT */}
                <div className="d-flex  align-items-center mbl_btn2 ms-4 total_connect">
                  <button
                    className=" d-flex justify-content-start align-items-center d-none mobie_connect"
                    onClick={connectWallet}
                  >
                    <div
                      className={
                        isWalletConnected
                          ? "btn_connection_wallet_fs"
                          : "btn_connection_wallet"
                      }
                    >
                      {isWalletConnected
                        ? walletShortFormer(userWallet)
                        : "Connect"}
                    </div>
                  </button>

                  {isWalletConnected && (
                    <div className=" d-flex justify-content-start align-items-center d-none connection">
                      <div className=" p-1 ">
                        <img src={BnbIcon} className="img-fluid " alt="" />
                      </div>
                    </div>
                  )}
                </div>

                <Link className="navbar-brand p-0 navbar-center " to="/">
                  <img
                    src={navbarLogo}
                    className="img-fluid mobile_wid d-none"
                    alt=""
                    width={"30px"}
                  />
                  <span className="logo_text">
                    Virtual Swap
                  </span>
                </Link>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d_none">
                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link
                        className={
                          iscolor == "Trade" ||
                            iscolor == "Limit" ||
                            iscolor == "Liqudity" ||
                            iscolor == "Spot"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Trade"
                        onClick={() => { setIsColor("Trade"); }}

                        to="/Trade_Swap"
                      >
                        Trade
                      </Link>
                    </div>
                    <div className="dropdown-content ">
                      <Link
                        className={
                          iscolor == "Liqudity" ? "nav-link-active" : "nav-link"
                        }
                        id="Liqudity"
                        onClick={() => setIsColor("Liqudity")}
                        to="/trade_liqudity"
                      // data-bs-toggle="collapse"
                      // data-bs-target="#navbarSupportedContent"
                      >
                        <div className="d-flex">
                          {/* <AiFillSketchCircle className="fs-3 mobile_none" /> */}
                          <img
                            src={virtualIcon10}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Liqudity</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Trade" ? "nav-link-active" : "nav-link"
                        }
                        id="Trade"
                        onClick={() => setIsColor("Trade")}
                        to="/Trade_Swap"
                      // data-bs-toggle="collapse" // kn sa vala krna ha ya dekh
                      // data-bs-target="#navbarSupportedContent"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon01}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Swap</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      {/* <Link
                        className={
                          iscolor == "Limit" ? "nav-link-active" : "nav-link"
                        }
                        id="Limit"
                        onClick={() => setIsColor("Limit")}
                        to="/trade_limit"
                      >
                        <div className="d-flex">
                          <img
                            src={SpotIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2 ">
                            <p className="mb-0">Limit</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link> */}
                      <Link
                        className={
                          iscolor == "Spot" ? "nav-link-active" : "nav-link"
                        }
                        id="Spot"
                        onClick={() => setIsColor("Spot")}
                        to="/spot"
                      // data-bs-toggle="collapse"
                      // data-bs-target="#navbarSupportedContent"
                      >
                        <div className="d-flex">
                          <img
                            src={LimitIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Spot</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link
                        className={
                          iscolor == "Earn" ||
                            iscolor == "Farms" ||
                            iscolor == "Pool"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Earn"
                        onClick={() => setIsColor("Earn")}
                        to="/farms"
                      >
                        Earn
                      </Link>
                    </div>
                    <div className="dropdown-content">
                      <Link
                        className={
                          iscolor == "Farms" ? "nav-link-active" : "nav-link"
                        }
                        id="Farms"
                        onClick={() => setIsColor("Farms")}
                        to="/farms"
                      >
                        <div className="d-flex">
                          <img
                            src={Farms}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Farms</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Pool" ? "nav-link-active" : "nav-link"
                        }
                        id="Pool"
                        onClick={() => setIsColor("Pool")}
                        to="/pool"
                      >
                        <div className="d-flex">
                          <img
                            src={Pool}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Pool</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link
                        className={
                          iscolor == "Win" ||
                            iscolor == "Trading Competition" ||
                            iscolor == "Prediction" ||
                            iscolor == "Virtual Bond" ||
                            iscolor == "Pottery"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Win"
                        onClick={() => setIsColor("Win")}
                        to="/Win_latest"
                      >
                        Win
                      </Link>
                    </div>
                    <div className="dropdown-content">
                      <Link
                        className={
                          iscolor == "Trading Competition"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Trading Competition"
                        onClick={() => setIsColor("Trading Competition")}
                        to="/Win_latest"
                      >
                        <div className="d-flex">
                          <img
                            src={CompetitionIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Trading Competition</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Prediction"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Prediction"
                        onClick={() => setIsColor("Prediction")}
                        to="/Win_prediction"
                      >
                        <div className="d-flex">
                          <img
                            src={PredictionIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Prediction</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Virtual Bond"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Virtual Bond"
                        onClick={() => setIsColor("Virtual Bond")}
                        to="/Win_lottery"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualBondIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Virtual Bond</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Pottery" ? "nav-link-active" : "nav-link"
                        }
                        id="Pottery"
                        onClick={() => setIsColor("Pottery")}
                        to="/Win_pottery"
                      >
                        <div className="d-flex">
                          <img
                            src={PotteryIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Pottery</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link
                        className={
                          iscolor == "Nft" ||
                            iscolor == "OveView" ||
                            iscolor == "Collection" ||
                            iscolor == "Activity"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Nft"
                        onClick={() => setIsColor("Nft")}
                        to="/Nft_overview"
                      >
                        Nft
                      </Link>
                    </div>
                    <div className="dropdown-content">
                      <Link
                        className={
                          iscolor == "OveView" ? "nav-link-active" : "nav-link"
                        }
                        id="OverView"
                        onClick={() => setIsColor("OverView")}
                        to="/Nft_overview"
                      >
                        <div className="d-flex">
                          <img
                            src={overviewIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">OverView</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Collection"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Collection"
                        onClick={() => setIsColor("Collection")}
                        to="/Nft_collection"
                      >
                        <div className="d-flex">
                          <img
                            src={collectionIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Collection</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Activity" ? "nav-link-active" : "nav-link"
                        }
                        id="Activity"
                        onClick={() => setIsColor("Activity")}
                        to="/Nft_activity"
                      >
                        <div className="d-flex">
                          <img
                            src={activity}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Activity</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link
                        className={
                          iscolor == "Virtual Event" ||
                            iscolor == "Legend User" ||
                            iscolor == "Jackpot" ||
                            iscolor == "Leader Board" ||
                            iscolor == "Tokenomics" ||
                            iscolor == "Virtual Gallery"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="More"
                        onClick={() => setIsColor("More")}
                        to="/Virtual_Event"
                      >
                        More
                      </Link>
                    </div>
                    <div className="dropdown-content">
                      <Link
                        className={
                          iscolor == "Virtual Event"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Virtual Event"
                        onClick={() => setIsColor("Virtual Event")}
                        to="/Virtual_Event"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon12}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Virtual Event</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Legend User"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Legend User"
                        onClick={() => setIsColor("Legend User")}
                        to="/legend_user"
                      >
                        <div className="d-flex">
                          <img
                            src={legendUserIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Legend User</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Jackpot" ? "nav-link-active" : "nav-link"
                        }
                        id="Jackpot"
                        onClick={() => setIsColor("Jackpot")}
                        to="/jackpot"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon08}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Jackpot</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Tokenomics"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Tokenomics"
                        onClick={() => setIsColor("Tokenomics")}
                        to="/tokenomic"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon14}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Tokenomics</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Leader Board"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Leader Board"
                        onClick={() => setIsColor("Leader Board")}
                        to="/leadBoard"
                      >
                        <div className="d-flex">
                          <img
                            src={LeadBoardIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Lead Board</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Virtual Gallery"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Virtual Gallery"
                        onClick={() => setIsColor("Virtual Gallery")}
                        to="/virtualGallery"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon13}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Virtual Gallery</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown">
                    <div tabIndex={0}>
                      <Link className="nav-link">
                        {/* <img
                          src={lines}
                          width={"20px"}
                          className="img-fluid"
                          alt=""
                        /> */}
                        <FiMoreHorizontal style={{ fontSize: "22px" }} />
                      </Link>
                    </div>
                    <div className="dropdown-content">
                      <Link
                        className={
                          iscolor == "Info" ||
                            iscolor == "Swap" ||
                            iscolor == " Stable Swap"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Info"
                        onClick={() => setIsColor("Info")}
                        to="/info_swap"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon07}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Info</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Ifo" ||
                            iscolor == "Latest" ||
                            iscolor == "Finished"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Ifo"
                        onClick={() => setIsColor("Ifo")}
                        to="/ifo_latest"
                      >
                        <div className="d-flex">
                          <img
                            src={IfoIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">IFO</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Voting" ? "nav-link-active" : "nav-link"
                        }
                        id="Voting"
                        onClick={() => setIsColor("Voting")}
                        to="/voting"
                      >
                        <div className="d-flex">
                          <img
                            src={votingIcon}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Voting</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Referral" ? "nav-link-active" : "nav-link"
                        }
                        id="Referral"
                        onClick={() => setIsColor("Referral")}
                        to="/referral"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon09}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Refferal</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Trade League"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Trade League"
                        onClick={() => setIsColor("Trade League")}
                        to="/Trade_league"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon11}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Trading League</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className={
                          iscolor == "Launch Pad"
                            ? "nav-link-active"
                            : "nav-link"
                        }
                        id="Launch Pad"
                        onClick={() => setIsColor("Launch Pad")}
                        to="/launchPad"
                      >
                        <div className="d-flex">
                          <img
                            src={virtualIcon03}
                            className="img-fluid icon-menu"


                          />
                          <div className="d-block ms-2">
                            <p className="mb-0">Launch Pad</p>

                            <p className="mb-0 font_sub mobile_none">
                              Swap tokens and earn passive income
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </ul>
                <div className="d-flex nav_mbl-responsive">
                  {/* ************************************************************************************************** */}
                  <div className="mt-2 nav-margin-responsive bnb_small">
                    <div className=" d-flex  align-items-center text-center">
                      <img
                        src={profile_icon}
                        className="img-fluid circle"
                        alt=""
                        width={"22px"}
                      />
                      <b className=" nav_amount ms-2">$3.922</b>
                    </div>
                  </div>
                  <div className="d-flex align-items-center nav_amount ms-4 gap-3 nav-margin-responsive mobile_nav">
                    {/* <img
                      src={language_icon}
                      className="img-fluid"
                      width={"26px"}
                      alt=""
                      height={"26px"}
                    /> */}
                    {/* SETTING MODAL */}
                    <Button
                      className="bg-transparent border-0 outline-0 shadow-none ms-3 mt-2"
                      variant="primary"
                      onClick={handleShow}
                    >
                      <AiFillSetting className="diff_clr" />
                    </Button>

                    <SettingModal
                      show={show}
                      onHide={() => setShow(false)}
                      toggleThem={toggleThem}
                    />
                  </div>

                  {/* ************************************************************************************************** */}

                  {/* ************************************************************************************************** */}
                  {/* ************************************************************************************************** */}
                  {/* <div className=" pt-2 ms-4">
            <div className="btn_bg d-flex flex-wrap text-white">
              <div className=" d-flex justify-content-center align-items-center ms-0 pe-2 btn_icon_bg">
              <img src={BnbIcon} className="img-fluid ms-1" alt="" width={"25px"} />
               
              </div>
              <div className=" d-flex justify-content-center align-items-center btn_bnb_smart_chain">
                <span>BNB Smart Chain</span>
              </div>
            </div>
          </div> */}

                  <div className="d-flex  align-items-center  ms-4 mbl_btn ms-5">
                    <button className=" d-flex justify-content-start align-items-center btn_bg bnb_small">
                      <div className="btn_icon_bg p-1 ">
                        <img src={BnbIcon} className="img-fluid " alt="" />
                      </div>
                      <div className=" btn_bnb_smart_chain">
                        BNB Smart Chain
                      </div>
                    </button>
                  </div>
                </div>
                {/* ************************************************************************************************** */}
                {/* <div className=" pt-2 ms-4">
            <div className="btn_connect_bg d-flex flex-wrap text-white">
              <div className=" d-flex justify-content-center align-items-center ms-0 pe-2 btn_connect_icon_bg">
              <img src={connection_icon} className="img-fluid ms-1" alt="" width={"25px"} />
              </div>
              <div className=" d-flex justify-content-center align-items-center btn_connection_wallet">
                <span>Connect Wallet</span>
              </div>
            </div>
          </div> */}
                <div className="d-flex  align-items-center mbl_btn2 small_connect ms-4">
                  <button
                    className=" d-flex justify-content-start align-items-center btn_connect_bg"
                    onClick={connectWallet}
                  >
                    <div className="btn_connect_icon_bg p-2">
                      <img
                        src={connection_icon}
                        className="img-fluid "
                        alt=""
                      />
                    </div>
                    <div className=" btn_connection_wallet">
                      {isWalletConnected
                        ? walletShortFormer(userWallet)
                        : "Connect Wallet"}
                    </div>
                  </button>
                </div>
                {/* Toglle navbar */}
                <button
                  className="transform-icon hide btn_toggle"
                  data-bs-toggle="offcanvas"
                  href="#offcanvasExample"
                  aria-controls="offcanvasExample"
                // onClick={() => setNavShow(!navShow)}
                >
                  {/* Bars here */}

                  <div htmlFor="menu_checkbox" className="">
                    <img src={toggle} alt="" className="toggle" />
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              </div>

            </nav>
          </div>
        </div>
      </div>
      {/* oddcanvas */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <p className="offcanvas-title" id="offcanvasExampleLabel">
            <Button
              className="bg-transparent border-0 outline-0 p-0 shadow-none"
              variant="primary"
              onClick={handleShow}
            >
              {/* <img
                      src={setting_icon}
                      className=""
                      alt=""
                      width={"26px"}
                      height={"26px"}
                    /> */}
              <AiFillSetting className="diff_clr" />
            </Button>
          </p>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 offcanvas_a">
            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className={
                    iscolor == "Trade" ||
                      iscolor == "Limit" ||
                      iscolor == "Liqudity" ||
                      iscolor == "Spot"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Trade"
                  onClick={() => setIsColor("Trade")}
                  to="/Trade_Swap"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Trade
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "Liqudity" ? "nav-link-active" : "nav-link"
                  }
                  id="Liqudity"
                  onClick={() => setIsColor("Liqudity")}
                  to="/trade_liqudity"
                // data-bs-toggle="collapse"
                // data-bs-target="#navbarSupportedContent"
                >
                  Liqudity
                </Link>
                <Link
                  className={
                    iscolor == "Trade" ? "nav-link-active" : "nav-link"
                  }
                  id="Trade"
                  onClick={() => setIsColor("Trade")}
                  to="/Trade_Swap"
                // data-bs-toggle="collapse" // kn sa vala krna ha ya dekh
                // data-bs-target="#navbarSupportedContent"
                >
                  Swap
                </Link>
                {/* <Link
                  className={
                    iscolor == "Limit" ? "nav-link-active" : "nav-link"
                  }
                  id="Limit"
                  onClick={() => setIsColor("Limit")}
                  to="/trade_limit"
                >
                  Limit
                </Link> */}
                <Link
                  className={iscolor == "Spot" ? "nav-link-active" : "nav-link"}
                  id="Spot"
                  onClick={() => setIsColor("Spot")}
                  to="/spot"
                // data-bs-toggle="collapse"
                // data-bs-target="#navbarSupportedContent"
                >
                  Spot
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className={
                    iscolor == "Earn" || iscolor == "Farms" || iscolor == "Pool"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Earn"
                  onClick={() => setIsColor("Earn")}
                  to="/farms"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Earn
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "Farms" ? "nav-link-active" : "nav-link"
                  }
                  id="Farms"
                  onClick={() => setIsColor("Farms")}
                  to="/farms"
                >
                  Farms
                </Link>
                <Link
                  className={iscolor == "Pool" ? "nav-link-active" : "nav-link"}
                  id="Pool"
                  onClick={() => setIsColor("Pool")}
                  to="/pool"
                >
                  Pool
                </Link>
              </div>
            </div>
            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className={
                    iscolor == "Win" ||
                      iscolor == "Trading Competition" ||
                      iscolor == "Prediction" ||
                      iscolor == "Virtual Bond" ||
                      iscolor == "Pottery"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Win"
                  onClick={() => setIsColor("Win")}
                  to="/Win_latest"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Win
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "Trading Competition"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Trading Competition"
                  onClick={() => setIsColor("Trading Competition")}
                  to="/Win_latest"
                >
                  Trading Competition
                </Link>
                <Link
                  className={
                    iscolor == "Prediction" ? "nav-link-active" : "nav-link"
                  }
                  id="Prediction"
                  onClick={() => setIsColor("Prediction")}
                  to="/Win_prediction"
                >
                  Prediction
                </Link>
                <Link
                  className={
                    iscolor == "Virtual Bond" ? "nav-link-active" : "nav-link"
                  }
                  id="Virtual Bond"
                  onClick={() => setIsColor("Virtual Bond")}
                  to="/Win_lottery"
                >
                  Virtual Bond
                </Link>
                <Link
                  className={
                    iscolor == "Pottery" ? "nav-link-active" : "nav-link"
                  }
                  id="Pottery"
                  onClick={() => setIsColor("Pottery")}
                  to="/Win_pottery"
                >
                  Pottery
                </Link>
              </div>
            </div>
            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className={
                    iscolor == "Nft" ||
                      iscolor == "OveView" ||
                      iscolor == "Collection" ||
                      iscolor == "Activity"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Nft"
                  onClick={() => setIsColor("Nft")}
                  to="/Nft_overview"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Nft
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "OveView" ? "nav-link-active" : "nav-link"
                  }
                  id="OverView"
                  onClick={() => setIsColor("OverView")}
                  to="/Nft_overview"
                >
                  OverView
                </Link>
                <Link
                  className={
                    iscolor == "Collection" ? "nav-link-active" : "nav-link"
                  }
                  id="Collection"
                  onClick={() => setIsColor("Collection")}
                  to="/Nft_collection"
                >
                  Collection
                </Link>
                <Link
                  className={
                    iscolor == "Activity" ? "nav-link-active" : "nav-link"
                  }
                  id="Activity"
                  onClick={() => setIsColor("Activity")}
                  to="/Nft_activity"
                >
                  Activity
                </Link>
              </div>
            </div>

            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className={
                    iscolor == "Virtual Event" ||
                      iscolor == "Legend User" ||
                      iscolor == "Jackpot" ||
                      iscolor == "Leader Board" ||
                      iscolor == "Tokenomics" ||
                      iscolor == "Virtual Gallery"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="More"
                  onClick={() => setIsColor("More")}
                  to="/Virtual_Event"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  More
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "Virtual Event" ? "nav-link-active" : "nav-link"
                  }
                  id="Virtual Event"
                  onClick={() => setIsColor("Virtual Event")}
                  to="/Virtual_Event"
                >
                  Virtual Event
                </Link>
                <Link
                  className={
                    iscolor == "Legend User" ? "nav-link-active" : "nav-link"
                  }
                  id="Legend User"
                  onClick={() => setIsColor("Legend User")}
                  to="/legend_user"
                >
                  Legend User
                </Link>
                <Link
                  className={
                    iscolor == "Jackpot" ? "nav-link-active" : "nav-link"
                  }
                  id="Jackpot"
                  onClick={() => setIsColor("Jackpot")}
                  to="/jackpot"
                >
                  Jackpot
                </Link>
                <Link
                  className={
                    iscolor == "Tokenomics" ? "nav-link-active" : "nav-link"
                  }
                  id="Tokenomics"
                  onClick={() => setIsColor("Tokenomics")}
                  to="/tokenomic"
                >
                  Tokenomics
                </Link>
                <Link
                  className={
                    iscolor == "Leader Board" ? "nav-link-active" : "nav-link"
                  }
                  id="Leader Board"
                  onClick={() => setIsColor("Leader Board")}
                  to="/leadBoard"
                >
                  Lead Board
                </Link>
                <Link
                  className={
                    iscolor == "Virtual Gallery"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Virtual Gallery"
                  onClick={() => setIsColor("Virtual Gallery")}
                  to="/virtualGallery"
                >
                  Virtual Gallery
                </Link>
              </div>
            </div>
            <div className="dropdown">
              <div tabIndex={0}>
                <Link
                  className="nav-link"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  {/* <img
                            src={lines}
                            width={"20px"}
                            className="img-fluid"
                            alt=""
                          /> */}
                  <FiMoreHorizontal style={{ fontSize: "22px" }} />
                </Link>
              </div>
              <div
                className="dropdown-content"
                aria-labelledby="navbarDropdownMenuLink"
                id="collapseExample4"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <Link
                  className={
                    iscolor == "Info" ||
                      iscolor == "Swap" ||
                      iscolor == " Stable Swap"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Info"
                  onClick={() => setIsColor("Info")}
                  to="/info_swap"
                >
                  Info
                </Link>
                <Link
                  className={
                    iscolor == "Ifo" ||
                      iscolor == "Latest" ||
                      iscolor == "Finished"
                      ? "nav-link-active"
                      : "nav-link"
                  }
                  id="Ifo"
                  onClick={() => setIsColor("Ifo")}
                  to="/ifo_latest"
                >
                  IFO
                </Link>
                <Link
                  className={
                    iscolor == "Voting" ? "nav-link-active" : "nav-link"
                  }
                  id="Voting"
                  onClick={() => setIsColor("Voting")}
                  to="/voting"
                >
                  Voting
                </Link>
                <Link
                  className={
                    iscolor == "Referral" ? "nav-link-active" : "nav-link"
                  }
                  id="Referral"
                  onClick={() => setIsColor("Referral")}
                  to="/referral"
                >
                  Referral
                </Link>
                <Link
                  className={
                    iscolor == "Trade League" ? "nav-link-active" : "nav-link"
                  }
                  id="Trade League"
                  onClick={() => setIsColor("Trade League")}
                  to="/Trade_league"
                >
                  Trade League
                </Link>
                <Link
                  className={
                    iscolor == "Launch Pad" ? "nav-link-active" : "nav-link"
                  }
                  id="Launch Pad"
                  onClick={() => setIsColor("Launch Pad")}
                  to="/launchPad"
                >
                  Launch Pad
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </div>



    </>
  );
}

export default Navbar;
