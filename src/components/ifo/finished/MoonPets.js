import React from "react";
import "./Finished.css";
import BluePic from "../../../Assets/Images/Group40.png";
import PinkPic from "../../../Assets/Images/Group42.png";
import YellowPic from "../../../Assets/Images/Group41.png";
import Blue from "../../../Assets/Images/Group25.png";
import Pink from "../../../Assets/Images/Group26.png";
import Yellow from "../../../Assets/Images/Group27.png";
import BlueDropDown from "../../../Assets/Images/Group43.png";
import PinkDropDown from "../../../Assets/Images/Group44.png";
import YellowDropDown from "../../../Assets/Images/Group45.png";
function MoonPets() {
  const style = [
    {
      background: "#01F7F7",
      boxShadow: "0px 20px 74px 10px #01F7F7",
      picture: BluePic,
      circlePic: Blue,
      dropdown: BlueDropDown,
    },
    {
      background: "#FD0093",
      boxShadow: "0px 20px 74px 10px #FD0093",
      picture: PinkPic,
      circlePic: Pink,
      dropdown: PinkDropDown,
    },
    {
      background: "#FAFF00",
      boxShadow: "0px 20px 74px 10px #FAFF00",
      picture: YellowPic,
      circlePic: Yellow,
      dropdown: YellowDropDown,
    },
  ];
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-md-12">
          {style.map((data) => {
            return (
              <>
                <div
                  className="Moon_card"
                  style={{
                    background: data.background,
                    boxShadow: data.boxShadow,
                  }}
                >
                  <div className=" d-flex justify-content-between moon_circle">
                    <div>
                      <img
                        src={data.circlePic}
                        className="img-fluid circlePic"
                        width={"86px"}
                        alt=""
                      />
                    </div>
                    <div className="me-3 dropPic">
                      <img
                        src={data.dropdown}
                        className="img-fluid circlePic"
                        width={"26px"}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="moonPic">
                    <img
                      src={data.picture}
                      className="img-fluid picture_moon"
                      width={"100%"}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoonPets;
