import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HashLink } from "react-router-hash-link";
import {IoMdArrowRoundBack} from 'react-icons/io'

const Accordion = ({ userInfo, i }) => {

    const [isActive, setIsActive] = useState(false);
    const [showdetail, setShowDetail] = useState(false);


    const showDetail = async () => {
        setShowDetail(!showdetail)
    }

    return (
        
        <div className='me_top'>
            
        <div className=" p-2 rounded-4 mx-2 border_inner">
            <div className="d-flex justify-content-between px-3">
                <div className="">
                    <p className='text-style mb-0 fw-bold'>{userInfo?.token0Symbol}/{userInfo?.token1Symbol}</p>
                    <p className="text-style2 mb-0">{userInfo?.liquidity.toFixed(10)}
                    </p>
                    <p className="text-style">(~2,833.52 USD)</p>
                
                </div>
                <span className="text-white text-decoration-none fs-3 icon_cursor" onClick={() => { showDetail() }}> {showdetail ? <><IoIosArrowUp /></> : <><IoIosArrowDown /></>}  </span>
            </div>
          
            {
                showdetail && <>
                    <div className="d-flex justify-content-between mb-2 ">
                        <div>

                            <span className="ms-3 text-white">Pooled {userInfo?.token0Symbol}:</span>
                        </div>
                        <div className="text-white">
                            <b>{Number(userInfo?.token0Pooled).toFixed(10)}</b>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <div>

                            <span className="ms-3 text-white">Pooled {userInfo?.token1Symbol}:</span>
                        </div>
                        <div className="text-white text-end">
                            <b>{Number(userInfo?.token1Pooled).toFixed(10)}</b>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <div>

                            <span className="ms-3 text-white">Share in Trading Pair:</span>
                        </div>
                        <div className="text-white text-end">
                            
                            <b>{Number(userInfo?.shareInPool).toFixed(2)}%</b>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-md-12 col-10 d-flex justify-content-center">
                            <HashLink to={`/liqudity_Swap/${userInfo.pairAddress}`} className="link_Add_new">
                                Add Liquidity
                            </HashLink>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-md-12 col-10 d-flex justify-content-center">
                            <HashLink to={`/liqudity_remove/${userInfo.pairAddress}`} className="link_Add_new">
                                Remove Liquidity
                            </HashLink>
                        </div>
                    </div>

                </>
            }
        </div>
      </div>
    );
};

export default Accordion;