import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";
import { withAdminAuth } from "../../HOC";
import { SD_Status } from "../../Utility/SD";
import { inputHelper } from "../../Helper";

let decoration = require("../../Assets/Images/decoration_3.jpg");

const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.COMPLETED,
];

function AllOrders() {
  const [orderData, setOrderData] = useState([]);
  const [filters, setFilters] = useState({
    searchString: "",
    status: "",
  });
  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
  });
  const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
    }),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters({
      searchString: filters.searchString,
      status: filters.status,
    });
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.apiResponse.result);
      const { TotalRecords } = JSON.parse(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  const getPageDetails = () => {
    const dataStartRecordNumber =
      (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndRecordNumber = pageOptions.pageNumber * pageOptions.pageSize;

    return `${dataStartRecordNumber} - ${
      dataEndRecordNumber < totalRecords ? dataEndRecordNumber : totalRecords
    } of ${totalRecords}`;
  };

  const handlePageOptionsChange = (direction: string, pageSize?: number) => {
    if (direction === "prev") {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber - 1,
      });
    } else if (direction === "next") {
      setPageOptions({
        pageSize: currentPageSize,
        pageNumber: pageOptions.pageNumber + 1,
      });
    } else if (direction === "change") {
      setPageOptions({
        pageSize: pageSize ? pageSize : currentPageSize,
        pageNumber: 1,
      });
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mx-5 mt-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
                <img
                  src={decoration}
                  alt="Image"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div className="col">
                <h1 className="text-success">All Orders</h1>
              </div>
            </div>
            <div className="d-flex" style={{ width: "40%" }}>
              <input
                type="text"
                className="form-control mx-2"
                placeholder="Search Name, Email or Phone"
                name="searchString"
                value={filters.searchString}
                onChange={handleChange}
              />
              <select
                className="form-select w-50 mx-2"
                name="status"
                onChange={handleChange}
                value={filters.status}
              >
                {filterOptions.map((status: string, index: number) => (
                  <option key={index} value={status === "All" ? "" : status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-outline-success"
                onClick={handleFilters}
              >
                Filter
              </button>
            </div>
          </div>
          <OrderList orderData={orderData} isLoading={isLoading} />
          <div className="d-flex mx-5 justify-content-end align-items-center mb-5">
            <div>Row per page: </div>
            <div>
              <select
                className="form-select mx-2"
                style={{ width: "80px" }}
                value={currentPageSize}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handlePageOptionsChange("change", Number(e.target.value));
                  setCurrentPageSize(Number(e.target.value));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="mx-2">{getPageDetails()}</div>
            <button
              onClick={() => handlePageOptionsChange("prev")}
              disabled={pageOptions.pageNumber === 1}
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() => handlePageOptionsChange("next")}
              disabled={
                pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
              }
              className="btn btn-outline-primary px-3 mx-2"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
