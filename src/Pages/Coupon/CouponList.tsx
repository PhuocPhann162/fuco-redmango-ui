import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../Apis/couponApi";
import { MainLoader } from "../../Components/Page/Common";
import { couponModel } from "../../Interfaces";
import { toast } from "react-toastify";

let decoration = require("../../Assets/Images/decoration_4.png");

export default function CouponList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCouponsQuery("");
  const [showContent, setShowContent] = useState(false);
  const [deleteCoupon] = useDeleteCouponMutation();

  useEffect(() => {
    if (!isLoading && data) {
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
  };

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
                  alt="Image"
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
            <div style={{ fontWeight: 700 }} className="row border ">
              <div className="col-3">Code</div>
              <div className="col-4">Discount Amount</div>
              <div className="col-4">Min Amount</div>
              <div className="col-1"></div>
            </div>
            {data.result.map((coupon: couponModel) => (
              <div className="row border" key={coupon.id}>
                <div className="col-3">{coupon.code}</div>
                <div className="col-4">
                  $ {coupon.discountAmount?.toFixed(2)}
                </div>
                <div className="col-4">$ {coupon.minAmount?.toFixed(2)}</div>
                <div className="col-1">
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
                    onClick={() => handleDeleteCoupon(coupon.id!)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
