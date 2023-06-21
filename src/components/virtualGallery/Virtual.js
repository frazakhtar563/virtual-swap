import React from "react";
import "./vitualGallery.css";

function Virtual() {
  return (
    <div className="virtual_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <h1 className="text_virtualGallery">Virtual Gallery</h1>
            <p className="text_virtual_explore">
              Explore and claim limited-edition digital artwork based on your
              credentials.
            </p>
            <div className="d-flex justify-content-center mb-5">
              <button className="btn_explore">Explore Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Virtual;
