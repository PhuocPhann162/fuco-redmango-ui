import React from "react";
import {
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
} from "../../Apis/orderApi";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { orderHeaderModel, userModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";

function MyOrders() {
  return (
    <>
      <OrderList />
    </>
  );
}

export default withAuth(MyOrders);
