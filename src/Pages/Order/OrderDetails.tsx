import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../Apis/orderApi";
import { OrderSummary } from "../../Components/Page/Order";
import { MainLoader } from "../../Components/Page/Common";
import { shoppingCartModel } from "../../Interfaces";

function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderDetailsQuery(id);
  console.log(data);

  let userInput, orderDetails;

  if (!isLoading && data?.result) {
    userInput = {
      name: data.result[0].pickupName,
      email: data.result[0].pickupEmail,
      phoneNumber: data.result[0].pickupPhoneNumber,
    };
    orderDetails = {
      id: data.result[0].orderHeaderId,
      cartItems: data.result[0].orderDetails,
      cartTotal: data.result[0].orderTotal,
      status: data.result[0].status,
    };
  }

  return (
    <div
      className="container my-3 mx-auto p-5 w-100"
      style={{ maxWidth: "750px" }}
    >
      {isLoading && <MainLoader />}
      {!isLoading && orderDetails && userInput && (
        <OrderSummary data={orderDetails} userInput={userInput} />
      )}
    </div>
  );
}

export default OrderDetails;
