import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../Apis/couponApi";
import { MainLoader } from "../../Components/Page/Common";
import { couponModel } from "../../Interfaces";
import { toast } from "react-toastify";
import { Modal } from "../../Components/Layout";
import { differenceInDays, format } from "date-fns";

let decoration = require("../../Assets/Images/decoration_4.png");

export default function CouponList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCouponsQuery("");
  const [showContent, setShowContent] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowContent(true);
    }
  }, [isLoading]);

  const handleDeleteCoupon = async (id: number) => {
    toast.promise(
      deleteCoupon(id),
      {
        pending: "Processing your request...",
        success: "Coupon Deleted Successfully 👌",
        error: "An unexpected error occured 🤯",
      },
      {
        theme: "dark",
      }
    );
    setIsModalShow(false);
  };

  let cnt = 1;

  return (
    <>
      {isLoading && <MainLoader />}
      {showContent && (
        <div className="table p-5 fade-in">
          <div className="d-flex align-items-center justify-content-between">
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
                <img
                  src={decoration}
                  alt="Decoration Header"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div className="col">
                <h1 className="text-success">Coupon List</h1>
              </div>
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                navigate("/coupon/couponUpsert");
              }}
            >
              Add New Coupon Code
            </button>
          </div>

          <div className="p-2">
            <div style={{ fontWeight: 700 }} className="row border">
              <div className="col-1">Id</div>
              <div className="col-2">Code</div>
              <div className="col-2">Discount Amount</div>
              <div className="col-2">Expiration Date</div>
              <div className="col-2">Min Amount</div>
              <div className="col-1">Status</div>
              <div className="col-2">Action</div>
            </div>
            {data?.result.map((coupon: couponModel) => (
              <div className="row border" key={coupon.id}>
                <div className="col-1">{cnt++}</div>
                <div className="col-2">{coupon.code}</div>
                <div className="col-2">
                  $ {coupon.discountAmount?.toFixed(2)}
                </div>
                <div className="col-2">
                  {new Date(coupon?.expiration!).toLocaleDateString()}
                </div>
                <div className="col-2">$ {coupon.minAmount?.toFixed(2)}</div>
                <div className="col-1">
                  {differenceInDays(new Date(coupon.expiration!), new Date()) +
                    1 <=
                  0
                    ? "Expired"
                    : "Active"}
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/coupon/couponUpsert/" + coupon.id)
                    }
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => setIsModalShow(true)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                  <Modal
                    title=" Are you sure?"
                    content="Do you really want to delete this coupon? This process cannot be undone."
                    isShow={isModalShow}
                    onClose={() => setIsModalShow(false)}
                    onConfirm={() => handleDeleteCoupon(coupon.id!)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
