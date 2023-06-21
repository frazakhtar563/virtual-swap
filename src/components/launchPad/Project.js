import React from "react";

function Project() {
  const data = [
    {
      name: "Project Name",
    },
    {
      name: "Project Name",
    },
    {
      name: "Project Name",
    },
    {
      name: "Project Name",
    },
    {
      name: "Project Name",
    },
  ];
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-md-12 mt-5">
          <div className="row mt-5 mb-5">
            <div className="table">
              <table className="table" style={{ width: "100%" }}>
                <tr className="project_table">
                  {data.map((data) => {
                    return (
                      <>
                        <th>{data.name}</th>
                      </>
                    );
                  })}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
