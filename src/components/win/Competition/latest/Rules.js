import React from "react";
function Rules() {
  const data = [
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
    {
      pair: "Eligible trading pairs",
      pairdetail: "Detail",
    },
  ];
  return (
    <div className="T_bg rule-margin">
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-12">
            <div className="row d-flex align-items-center justify-content-around">
              <div className="col-lg-4 col-md-6">
                <div className="t-rule mt-5">Rules</div>
                <div className="col-md-8 rule-box1 mb-4">
                  <div className="p-4">
                    <div className="title-box1">
                      Trade to increase your rank
                    </div>
                    <div className="detail-box1 mt-2">
                      Eligible pairs: DAR/BNB, CAKE/BNB, and CAKE/BUSD. Please
                      note that the volume from limit orders will not be
                      indexed.
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="col-md-8 rule-box2 mb-4">
                  <div className="p-4">
                    <div className="title-box2">Play as a team</div>
                    <div className="detail-box1 mt-2">
                      Eligible pairs: DAR/BNB, CAKE/BNB, and CAKE/BUSD. Please
                      note that the volume from limit orders will not be
                      indexed.
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="col-md-8 rule-box3 mb-4">
                  <div className="p-4">
                    <div className="title-box3">Everyone’s a winner!</div>
                    <div className="detail-box1 mt-2">
                      Eligible pairs: DAR/BNB, CAKE/BNB, and CAKE/BUSD. Please
                      note that the volume from limit orders will not be
                      indexed.
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="PF-box">
                  <div className="t-Fax">FAQ</div>
                  <table>
                    {data.map((data) => {
                      return (
                        <>
                          <tr className="">
                            <td className="PF-table p-3">{data.pair}</td>
                            <td className="PF-detail p-3">{data.pairdetail}</td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rules;
