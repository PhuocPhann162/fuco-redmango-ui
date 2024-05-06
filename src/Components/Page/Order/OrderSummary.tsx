import React, { useEffect, useState } from "react";
import orderSummaryProps from "./orderSummaryProps";
import { cartItemModel } from "../../../Interfaces";
import { getStatusColor } from "../../../Helper";
import { useNavigate } from "react-router-dom";
import { SD_Roles, SD_Status } from "../../../Utility/SD";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useUpdateOrderHeaderMutation } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const badgeTypeColor = getStatusColor(data.status!);
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();

  const nextStatus: any =
    data.status! === SD_Status.CONFIRMED
      ? { corlor: "info", value: SD_Status.BEING_COOKED }
      : data.status! === SD_Status.BEING_COOKED
      ? { corlor: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && {
          corlor: "success",
          value: SD_Status.COMPLETED,
        };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleNextStatus = async () => {
    setIsLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setIsLoading(false);
  };

  const handleCancel = async () => {
    setIsLoading(true);

    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED,
    });
    setIsLoading(false);
  };

  const totalPrice = data.cartTotal! - (data.discount ? data.discount : 0);

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-2">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {data.cartItems?.map(
                  (cartItem: cartItemModel, index: number) => (
                    <div className="d-flex" key={index}>
                      <div className="d-flex w-100 justify-content-between">
                        <p>{cartItem.menuItem?.name}</p>
                        <p>
                          ${cartItem.menuItem?.price} x {cartItem.quantity!} =
                        </p>
                      </div>
                      <p style={{ width: "70px", textAlign: "right" }}>
                        $
                        {(cartItem.menuItem?.price ?? 0) *
                          (cartItem.quantity ?? 0)}
                      </p>
                    </div>
                  )
                )}

                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <span>Total Cart Price: </span>
                  <h4 className="" style={{ textAlign: "right" }}>
                    ${data.cartTotal?.toFixed(2)}
                  </h4>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Discount Amount: </span>
                  <h4 className="" style={{ textAlign: "right" }}>
                    ${data.discount?.toFixed(2)}
                  </h4>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Total Price After Discount: </span>
                  <h4 className="text-danger" style={{ textAlign: "right" }}>
                    ${totalPrice.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {userData.role === SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCELLED &&
                  data.status! !== SD_Status.COMPLETED && (
                    <button
                      disabled={loading}
                      className="btn btn-danger mx-2"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  )}
                <button
                  disabled={loading}
                  onClick={handleNextStatus}
                  className={`btn btn-${nextStatus.corlor}`}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
