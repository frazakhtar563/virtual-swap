import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import "./pagination.css"

function Items({ currentItems, title }) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-5">
          <div className="">
            <div className="">
              {currentItems?.length != 0 ? (
                currentItems?.map((item, index) => {
                  return (
                    <div
                      className="row d-flex justify-content-center mt-1 mb-2"
                      key={index}
                    >
                      <div className="col-md-1">
                        <span className="text-details mb-2">{index + 1}</span>
                      </div>
                      <div className="col-md-2">
                        <span className="text-details mb-2">
                          {item?.address &&
                            item?.address.substring(0, 4) +
                              "..." +
                              item?.address.substring(item?.address.length - 4)}
                        </span>
                      </div>
                      <div className="col-md-2">
                        <span className="text-details mb-2">
                          {item?.reward}
                        </span>
                      </div>
                      <div className="col-md-2">
                        <div className=" text-details mb-2">
                          {item?.currentDeposit}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className=" text-details mb-2">
                          {item?.totalDeposit}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className=" text-details mb-2">
                          {item?.affiliateGenerated}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginatedItems({ itemsPerPage, levelAddressDetail }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    let sliced;
    for (var i = 0; i < levelAddressDetail?.length; i++) {
      sliced = levelAddressDetail.slice(itemOffset, endOffset);
    }

    setCurrentItems(sliced);
    setPageCount([Math.ceil(levelAddressDetail?.length / itemsPerPage)]);
  }, [itemOffset, itemsPerPage, levelAddressDetail]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % levelAddressDetail?.length;

    setItemOffset(newOffset);
  };
  let newArray = ["go", "went", "gone", "go", "went", "gone"];

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel={<IoCaretForwardSharp />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<IoCaretBackSharp />}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item page-item2"
        previousLinkClassName="page-link arrow"
        nextClassName="page-item page-item2"
        nextLinkClassName="page-link arrow"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        pageLabelBuilder={(page) => {
          return newArray[page - 1];
        }}
      />
    </>
  );
}

export default PaginatedItems;
