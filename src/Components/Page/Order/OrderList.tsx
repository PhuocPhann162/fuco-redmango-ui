import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../../Apis/orderApi";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../Interfaces";

function OrderList() {
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetAllOrdersQuery(userData.id);

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">Orders List</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-3">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2"></div>
            </div>
            {data.result.map((orderItem: orderHeaderModel) => (
              <div className="row border" key={orderItem.orderHeaderId}>
                <div className="col-1">{orderItem.orderHeaderId}</div>
                <div className="col-3">{orderItem.pickupName}</div>
                <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                <div className="col-1">
                  $ {orderItem.orderTotal!.toFixed(2)}
                </div>
                <div className="col-1"># {orderItem.totalItems}</div>
                <div className="col-2">
                  {new Date(orderItem.orderDate!).toLocaleDateString()}
                </div>
                <div className="col-2">
                  <button className="btn btn-success">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
