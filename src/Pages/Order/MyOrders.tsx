import React from "react";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader } from "../../Components/Page/Common";
import { OrderList } from "../../Components/Page/Order";

function MyOrders() {
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetAllOrdersQuery(userData.id);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <OrderList orderData={data.result} isLoading={isLoading} />
      )}
    </>
  );
}

export default withAuth(MyOrders);
