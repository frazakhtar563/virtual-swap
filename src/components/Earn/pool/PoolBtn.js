import React from 'react'
import girdIcon from '../../../Assets/Images/gird.png'
import list_icon from '../../../Assets/Images/listIcon.png'
import { Link } from 'react-router-dom'
import SwitchForm from '../../Header/SwitchForm'

function poolButton() {
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="row d-flex justify-content-between">
            <div className="col-lg-5 col-md-12 d-flex justify-content-start gap-3 align-items-end">
              {/* <div className="">
                <Link className="link_hover">
                  <img
                    src={list_icon}
                    className="img-fluid"
                    width={'18px'}
                    alt=""
                  />
                </Link>
              </div>
              <div className="">
                <Link to="/farmGrid" className="link_hover">
                  <img
                    src={girdIcon}
                    className="img-fluid"
                    width={'18px'}
                    alt=""
                  />
                </Link>
              </div> */}
              <div className="">
              <div className="d-flex gap-1 align-items-center">
                
                <SwitchForm className="mt-3"/>
                <h5 className="mt-2 sett_font ms-2">Staked Only</h5>
                 </div>  
              </div>
              <div className="">
              <div className="d-flex gap-1 align-items-center">
                
                <SwitchForm className="mt-3"/>
                <h5 className="mt-2 sett_font ms-2">Booster Available</h5>
                 </div>  
              </div>
            </div>
            <div className="col-lg-6 col-md-12 d-flex justify-content-between align-items-center  farm-responsive">
              <div className="btn-farm-responsive">
                <div
                  className="btn-group btn-group-lg mt-4"
                  role="group"
                  aria-label="Large button group"
                >
                  <button type="button" className="btn btn-Live ">
                    Live
                  </button>
                  <button type="button" className="btn btn-Live">
                    Finished
                  </button>
                </div>
              </div>
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

export default poolButton
