import React from "react";
import "./leadBoard.css";
// import { GiConvict } from "react-icons/gi";
import trophy2 from "../../Assets/Images/trophy2.png";
import member from "../../Assets/Images/member.png";
import { Link } from "react-router-dom";
import picture from "../../Assets/Images/team_card.png"
function Teams() {
  const stylecss = [
    {
      color: "#01F7F7",
      border: "1px solid #01F7F7",
      paragraph:
        "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
      title: "Syrup Storm",
      button: "See More",
      boxshadow: "0px 20px 74px 10px #01F7F7",
    },
    {
      color: "#FD0093",
      border: "1px solid #FD0093",
      title: "Syrup Storm",
      button: "See More",
      paragraph:
        "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
      boxshadow: "0px 20px 74px 10px #FD0093",
    },
    {
      color: "#FAFF00",
      border: "1px solid #FAFF00",
      title: "Syrup Storm",
      button: "See More",
      paragraph:
        "The storm's a-comin! Watch out! These bulls are stampeding in a syrupy surge!",
      boxshadow: "0px 20px 74px 10px #FAFF00",
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <h1 className="text-white text_heading_teams mt-5">TEAMS</h1>
          {stylecss.map((data) => {
            return (
              <>
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className="team_card"
                      style={{
                        color: data.color,
                        border: data.border,
                        boxShadow: data.boxshadow,
                      }}
                    >
                      <div className="row ">
                        <div className="col-lg-8 col-md-12">
                          <div className="p-5">
                            <h3 className="teams_title">{data.title}</h3>
                            <p className="text-white teams_paragraph">
                              {data.paragraph}
                            </p>
                            <Link className="link_teams_see">
                              {data.button}
                            </Link>

                            <ul className="text-white d-flex gap-4 teams_list mt-5">
                              <li className="">
                                <img
                                  src={trophy2}
                                  className="img-fluid"
                                  width={"16px"}
                                />{" "}
                                Coming Soon
                              </li>
                              <li className="">
                                <img
                                  src={member}
                                  className="img-fluid"
                                  width={"16px"}
                                />{" "}
                                189,252
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 ">
                          <div className="team_picture">
                            <div
                              className="team_circle me-3"
                              style={{ color: data.color, border: data.border }}
                            >
                              <div className="ms-3 mt-1">1</div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Teams;
