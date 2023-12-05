import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";
import { withAdminAuth } from "../../HOC";
import { SD_Status } from "../../Utility/SD";
import { inputHelper } from "../../Helper";
import { orderHeaderModel } from "../../Interfaces";

const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.COMPLETED,
];

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  const [orderData, setOrderData] = useState([]);
  const [filters, setFilters] = useState({
    searchString: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    const tempData = data.result.filter((orderItem: orderHeaderModel) => {
      if (
        (orderItem.pickupName &&
          orderItem.pickupName
            ?.toLowerCase()
            .includes(filters.searchString.toLowerCase())) ||
        (orderItem.pickupEmail &&
          orderItem.pickupEmail
            ?.toLowerCase()
            .includes(filters.searchString.toLowerCase())) ||
        (orderItem.pickupPhoneNumber &&
          orderItem.pickupPhoneNumber?.includes(filters.searchString))
      ) {
        return orderItem;
      }
    });

    const finalArray = tempData.filter((orderItem: orderHeaderModel) => {
      if(filters.status !== "") {
        if(orderItem.status === filters.status) {
          return orderItem;
        }
        return null;
      }
      return orderItem;
    });

    setOrderData(finalArray);
  };

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
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
