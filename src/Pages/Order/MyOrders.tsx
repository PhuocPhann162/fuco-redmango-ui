import React from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";
import { SD_Status } from "../../Utility/SD";

const filterOptions = [
  "All",
  SD_Status.CONFIRMED,
  SD_Status.BEING_COOKED,
  SD_Status.READY_FOR_PICKUP,
  SD_Status.COMPLETED,
];

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({ userId });
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mx-5 mt-5">
            <h1 className="text-success">My Orders</h1>
          </div>
          <OrderList
            orderData={data?.apiResponse.result}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}

export default withAuth(MyOrders);
