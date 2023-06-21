import React from "react";

export default function Funded() {
  const data = [
    {
      background: "#010017",
      border: "1px solid #FAFF00",
      color: "#FAFF00",
      title: "Total Funds Raised",
      heading: "$0",
    },
    {
      background: "#010017",
      border: "1px solid #01F7F7",
      color: "#01F7F7",
      title: "Total Funds Raised",
      heading: "$0",
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5 mb-5">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-4 col-md-12 mt-5 ">
              <h2 className="text_funded">Funded Projects</h2>
              <p className="text_we_bring">
                We bring emerging blockchain projects to the front end of
                innovation.
              </p>
            </div>
            <div className="col-lg-6 col-md-12  ">
              <div className="row d-flex justify-content-between">
                {data.map((data) => {
                  return (
                    <div className="col-lg-6 col-md-12 funded_margin">
                      <div
                        className="funded_card"
                        style={{
                          background: data.background,
                          border: data.border,
                        }}
                      >
                        <div className="m-5">
                          <h2 className="text-center t_funded">{data.title}</h2>
                          <p
                            className="text-center t_funded"
                            style={{ color: data.color }}
                          >
                            <strong>$0</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
