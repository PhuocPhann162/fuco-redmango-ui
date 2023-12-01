import React from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";
import { withAdminAuth } from "../../HOC";

function AllOrders() {
  const { data, isLoading } = useGetAllOrdersQuery("");
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList orderData={data.result} isLoading={isLoading} />
      )}
    </>
  );
}

export default withAdminAuth(AllOrders);
