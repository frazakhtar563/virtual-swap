import React from "react";
import pic from "../../Assets/Images/launchPad1.png";

function Highlight() {
  const style = [
    {
      background: "#030039",
      border: "1px solid #01F7F7",
      color: "#01F7F7",
      picture: pic,
      title: "Buy Tickets",
      boxShadoow: "0px 20px 74px 10px #01F7F7",
      heading:
        "Prices are set when the round starts, equal to 5 USD in CAKE per ticket.",
    },
    {
      background: "#030039",
      border: "1px solid #FD0093",
      color: "#FD0093",
      picture: pic,
      title: "Play as a team",
      boxShadoow: "0px 20px 74px 10px #FD0093",
      heading:
        "There is one draw every day alternating between 0 AM UTC and 12 PM UTC.",
    },
    {
      background: "#030039",
      border: "1px solid #FAFF00",
      color: "#FAFF00",
      picture: pic,
      title: "Everyone’s a winner!",
      boxShadoow: "0px 20px 74px 10px #FAFF00",
      heading:
        "Once the round’s over, come back to the page and check to see if you’ve won!",
    },
  ];
  return (
    <div className="launchPad_bg">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <div className="row mt-5">
              <h1 className="text_highlight">Launchpad Highlights</h1>
              <p className="text_ifThe">
                If the digits on your tickets match the winning numbers in the
                correct order, you win a portion of the prize pool.Simple!
              </p>
            </div>
            <div className="row d-flex justify-content-around mt-5">
              {style.map((data) => {
                return (
                  <>
                    <div className="col-lg-4 col-md-12">
                      <div
                        className="highlight_card"
                        style={{
                          background: data.background,
                          border: data.border,
                          boxShadow: data.boxShadoow,
                        }}
                      >
                        <div className="">
                          <div>
                            <img
                              src={data.picture}
                              className="img-fluid"
                              width={"100%px"}
                              alt=""
                            />
                          </div>
                          <div className="p-3">
                            <div
                              className="card_title"
                              style={{ color: data.color }}
                            >
                              {data.title}
                            </div>
                            <div className="text-white">{data.heading}</div>
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
      </div>
    </div>
  );
}

export default Highlight;
