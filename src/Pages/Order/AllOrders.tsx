import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";
import { withAdminAuth } from "../../HOC";
import { SD_Status } from "../../Utility/SD";
import { inputHelper } from "../../Helper";

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
  const { data, isLoading } = useGetAllOrdersQuery({
    ...(apiFilters && {
      searchString: apiFilters.searchString,
      status: apiFilters.status,
    }),
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
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
      console.log(data.totalRecords);
      setTotalRecords(TotalRecords);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mx-5 mt-5">
            <h1 className="text-success">Orders List</h1>
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
        </>
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
