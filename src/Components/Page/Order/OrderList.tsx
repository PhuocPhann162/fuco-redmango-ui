import React from "react";
import { MainLoader } from "../Common";
import { orderHeaderModel } from "../../../Interfaces";
import OrderListProps from "./orderListType";
import { useNavigate } from "react-router-dom";
import { getStatusColor } from "../../../Helper";

function OrderList({ orderData, isLoading }: OrderListProps) {
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table-responsive px-5 px-md-5">
          <table className="table table-bordered table-striped table-hover px-5 fade-in">
            <thead>
              <tr className="border">
                <th scope="col" className="col-1">
                  ID
                </th>
                <th scope="col" className="col-2">
                  Name
                </th>
                <th scope="col" className="col-2">
                  Phone
                </th>
                <th scope="col" className="col-1">
                  Total
                </th>
                <th scope="col" className="col-1">
                  Discount
                </th>
                <th scope="col" className="col-1">
                  Items
                </th>
                <th scope="col" className="col-1">
                  Date
                </th>
                <th scope="col" className="col-2">
                  Status
                </th>
                <th scope="col" className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {orderData &&
                orderData.map((orderItem: orderHeaderModel) => (
                  <tr className="border" key={orderItem.orderHeaderId}>
                    <td className="col-1">{orderItem.orderHeaderId}</td>
                    <td className="col-2">{orderItem.pickupName}</td>
                    <td className="col-2">{orderItem.pickupPhoneNumber}</td>
                    <td className="col-1">
                      $ {orderItem.orderTotal!.toFixed(2)}
                    </td>
                    <td className="col-1">$ {orderItem.discountAmount!}</td>
                    <td className="col-1">{orderItem.totalItems}</td>
                    <td className="col-1">
                      {new Date(orderItem.orderDate!).toLocaleDateString()}
                    </td>
                    <td className="col-2">
                      <span
                        className={`badge bg-${getStatusColor(
                          orderItem.status!
                        )}`}
                      >
                        {orderItem.status}
                      </span>
                    </td>
                    <td className="col-1 text-center">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate(
                            "/order/orderDetails/" + orderItem.orderHeaderId
                          );
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default OrderList;
