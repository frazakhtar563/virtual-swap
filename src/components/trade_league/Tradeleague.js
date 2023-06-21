import React from "react";
import "./trade.css";

function Tradeleague() {
  return (
    <div className="trade_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="t-trate-virtual">virtual swap : $20,000</div>
            <div className="t-tradeleague">trade-league</div>
            <div className="t-trade-explore">Explore and claim limited</div>
            <div className="row d-flex justify-content-center">
              <div className="col-xl-4 col-lg-6 col-md-8 col-12 d-flex justify-content-between    mb-2 mt-3 gap-2">
                <button className="btn-trade-buy">Buy Ticket -$1</button>
                <button className="btn-trade-view">View Rules</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tradeleague;
