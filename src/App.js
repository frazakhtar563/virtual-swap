import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer/Footer";
import Pages from "./Pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Trade_Swap from "./Pages/trade/trade";
import Limit from "./Pages/trade/tradeLimit";
import Liqudity from "./Pages/trade/tradeLiquidity";
import Farms from "./Pages/earn/farms";
import Fgird from "./Pages/earn/grid";
import Pool from "./Pages/earn/pool";
import Latest from "./Pages/win/tradingCompetition/latest";
import Prediction from "./Pages/win/predictions/predictions";
import Lottery from "./Pages/win/lottery/lottery";
import Pottery from "./Pages/win/pottery/pottery";
import OverView from "./Pages/nft/overview/overview";
import Collection from "./Pages/nft/collection/collection";
import Activity from "./Pages/nft/activity/activity";
import Tokenomic from "./Pages/tokonomics/tokenomics";
import Virtual_Event from "./Pages/virtualEvent/virtualEvents";
import Info_stable from "./Pages/info/swap/swap";
import Info_stableSwap from "./Pages/info/stableSwap/stableSwap";
import Trade_league from "./Pages/tradeLeague/tradeLeague";
import Legend_user from "./Pages/legenduser/legendUser";
import Jackpot from "./Pages/jackpot/jackpot";
import Referral from "./Pages/referral/referral";
import Finished from "./Pages/win/tradingCompetition/finished";
import Ifo_latest from "./Pages/ifo/latest";
import Voiting from "./Pages/voiting/voiting";
import LeadBoard from "./Pages/leaderBoard/leaderBoard";
import VirtualGallery from "./Pages/virtualGallery/virtualGallery";
import LaunchPad from "./Pages/launchPad/launchPad";
import Ifo_finished from "./Pages/ifo/finished";
import LiquditySwap from "./Pages/trade/tradeliquditySwap";
import LiqudityAdd from "./Pages/trade/tradeliqudityAdd";
import Spot from "./Pages/trade/spot";
import Heikin from "./components/trade-swap/spot/heikinAshi/index";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FarmTable from "./components/Earn/farms/FarmTable";
import TradeliqudityRemove from "./Pages/trade/tradeliqudityRemove";
import PageNotFound from "./components/NotFound/NotFound";
function App() {
  return (
    <>
      <ToastContainer />

      <BrowserRouter>
        <Navbar />
        <div className="bg">
          <Routes>
            <Route path="/" element={<Pages />} />
            <Route path="/Trade_Swap" element={<Trade_Swap />} />
            {/* <Route path="/trade_limit" element={<Limit />} /> */}
            <Route path="/trade_liqudity" element={<Liqudity />} />
            <Route path="/farms" element={<Farms />} />
            <Route path="/farmGrid" element={<Fgird />} />
            <Route path="/pool" element={<Pool />} />
            <Route path="/Win_latest" element={<Latest />} />
            <Route path="/Win_Finished" element={<Finished />} />
            <Route path="/Win_prediction" element={<Prediction />} />
            <Route path="/Win_lottery" element={<Lottery />} />
            <Route path="/Win_pottery" element={<Pottery />} />
            <Route path="/Nft_overview" element={<OverView />} />
            <Route path="/Nft_collection" element={<Collection />} />
            <Route path="/Nft_activity" element={<Activity />} />
            <Route path="/tokenomic" element={<Tokenomic />} />
            <Route path="/Virtual_Event" element={<Virtual_Event />} />
            <Route path="/info_swap" element={<Info_stable />} />
            <Route path="/info_stableSwap" element={<Info_stableSwap />} />
            <Route path="/trade_league" element={<Trade_league />} />
            <Route path="/legend_user" element={<Legend_user />} />
            <Route path="/jackpot" element={<Jackpot />} />
            <Route path="/referral" element={<Referral />} />
            {/* <Route path="/liqudity_swap/:pairAddress" element={<LiquditySwap />} /> */}
            <Route path="/liqudity_add" element={<LiqudityAdd />} />
            <Route path="/liqudity_remove/:pairAddress" element={<TradeliqudityRemove />} />
            <Route path="/ifo_latest" element={<Ifo_latest />} />
            <Route path="/ifo_finished" element={<Ifo_finished />} />
            <Route path="/voting" element={<Voiting />} />
            <Route path="/leadBoard" element={<LeadBoard />} />
            <Route path="/virtualGallery" element={<VirtualGallery />} />
            <Route path="/launchPad" element={<LaunchPad />} />
            <Route path="/liqudity_Swap/:pairAddress" element={<LiquditySwap />} />
            <Route path="/spot" element={<Spot />} />
            <Route path="/heikin" element={<Heikin />} />
            <Route path="/FarmTable" element={<FarmTable />} />
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
