import React from 'react'
import girdIcon from "../../../Assets/Images/gird.png";
import list_icon from "../../../Assets/Images/listIcon.png";
import { Link } from "react-router-dom";
import FarmTable from './FarmTable';
import { Button } from 'react-bootstrap';
import EarnFormModal from '../../modals/earnFarmModal'
import { useState } from 'react';
import SwitchForm from '../../Header/SwitchForm'
function FarmButton() {
  const [showEarnFormModal, setShowEarnFormModal] = useState(false);

  return (
    <div className='container'>
      <div className="row mt-4">
        <div className="col-md-12 mb-3">
          <div className="row d-flex">
            <div className="col-lg-6 col-md-12 d-flex align-items-end  gap-3">
              {/* <div className="">
                <Link className="link_hover">
                  <img
                    src={list_icon}
                    className="img-fluid"
                    width={"15px"}
                    alt=""
                  />
                </Link>
              </div>
              <div className="">
                <Link to="/farmGrid" className="link_hover">
                  <img
                    src={girdIcon}
                    className="img-fluid"
                    width={"15px"}
                    alt=""
                  />
                </Link>
              </div> */}
              <div className="">
              <div className="d-flex gap-1 align-items-center">
                
             <SwitchForm className="mt-3"/>
             <h5 className="mt-2 sett_font">Staked Only</h5>
              </div>                  
              </div>
              {/* <div className="">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    Booster Available
                  </label>
                </div>

              </div> */}
              <Button className='bg-dark' onClick={() => { setShowEarnFormModal(true) }}>OpenForm</Button>
              <EarnFormModal
                show={showEarnFormModal}
                onHide={() => setShowEarnFormModal(false)}
              />

            </div>
            <div className="col-lg-6 col-md-12 d-flex justify-content-end gap-3 align-items-center  farm-responsive">
              {/* <div className="btn-farm-responsive">
                <div
                  className="btn-group btn-group-lg mt-4"
                  role="group"
                  aria-label="Large button group"
                >

                  <Link type="button" className="btn btn-Live " to="/farms">
                    Live
                  </Link>
                  <Link type="button" className="btn btn-Live" to="/farms">
                    Finished
                  </Link>
                </div>
              </div> */}
              <div className="farm-responsive">
                <label className="tsort">SORT BY</label>
                <select
                  className="form-select inputBack"
                  aria-label="Default select example"
                >
                  <option selected>Hot</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              <div className="farm-responsive">
                <label className="tsort">SEARCH</label>
                <input
                  class="form-control search-input"
                  type="search"
                  placeholder="Search Farms"
                  aria-label="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmButton