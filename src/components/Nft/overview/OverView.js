import React from "react";
import "./OverView.css";
import searchIcon from "../../../Assets/Images/searchBar.png";

function OverView() {
  return (
    <>
      <div className="Over_bg">
        <div className="row">
          <div className="col-md-12">
            <div className="tNft mt-5">NFT Marketplace</div>
            <div className="t-nft-Buy">
              Buy and Sell NFTs on BNB Smart Chain
            </div>
            <div className="row justify-content-center">
              <div className="col-md-6 mt-2">
                <div className="input-group  mb-3 mt-5">
                  <span className="search_icon_bg new_height text-center">
                    <img
                      src={searchIcon}
                      className="img-fluid mt-2"
                      alt=""
                      width={"50px"}
                    />
                  </span>
                  <input
                    type="text"
                    className="form-control search_bar"
                    placeholder="Username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default OverView;
