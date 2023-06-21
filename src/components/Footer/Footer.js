import React from "react";
import "./Footer.css";
import Footer_Pic from "../../Assets/Images/footer_Pic.png";

function Footer() {
  return (
    <div className="footer_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-xl-12">
            <div className="row mb-2 ">
              <div className="col-xl-3 col-lg-3 col-md-12 mt-1">
                <div className="d-flex justify-content-center">
                  <img
                    src={Footer_Pic}
                    // className="img-fluid"
                    alt=""
                    width={"300px"}
                  />
                </div>
                <div className="footer-text justi">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut.
                </div>
              </div>
              <div className="col-xl-3  col-lg-3  col-md-4 col-sm-4 text-about">
                <ul className="mt-3">
                  <h3 className="text-about-h3">About</h3>
                  <li className="">CONTACT</li>
                  <li className="">Brand</li>
                  <li className="">Blog</li>
                  <li className="">Community</li>
                  <li className="">Litepaper</li>
                  <li className="">Online Store</li>
                </ul>
              </div>
              <div className="col-xl-3  col-lg-3   col-md-4 col-sm-4 text-about">
                <ul className="mt-3">
                  <h3 className="text-about-h3">Help</h3>
                  <li className="">Customer</li>
                  <li className=""> Support</li>
                  <li className="">Troubleshooting</li>
                  <li className="">Guides</li>
                </ul>
              </div>
              <div className=" col-xl-3  col-lg-3   col-md-4 col-sm-4 text-about">
                <ul className="mt-3">
                  <h3 className="text-about-h3">dEVELOPERS</h3>
                  <li className="">Github</li>
                  <li className="">Documentation</li>
                  <li className="">Bug Bounty</li>
                  <li className="">aUDITS</li>
                  <li className="">CAREERS</li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="text-center mb-3 text-copyright">
            Copyright © 2022 Company Name S.L. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
