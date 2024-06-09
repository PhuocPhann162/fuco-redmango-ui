import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCouponMutation,
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from "../../Apis/couponApi";
import { inputHelper, toastNotify } from "../../Helper";
import { MainLoader } from "../../Components/Page/Common";
import { differenceInDays, format } from "date-fns";

const couponData = {
  code: "10OFF",
  discountAmount: 10,
  minAmount: 100,
  expirationDis: 7,
};

export default function CouponUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [couponInputs, setCouponInputs] = useState(couponData);
  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const { data } = useGetCouponByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      console.log(data);
      const expirationDate = new Date(data?.result.expiration);
      const currentDate = new Date();

      // Tính khoảng cách số ngày giữa ngày expiration và ngày hiện tại
      const daysDifference = differenceInDays(expirationDate, currentDate);
      const tempData = {
        code: data.result.code,
        discountAmount: data.result.discountAmount,
        minAmount: data.result.minAmount,
        expirationDis: daysDifference + 1,
      };
      setCouponInputs(tempData);
    }
  }, [data]);

  const handleCouponInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, couponInputs);
    setCouponInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("Code", couponInputs.code);
    formData.append("DiscountAmount", couponInputs.discountAmount.toString());
    formData.append("MinAmount", couponInputs.minAmount.toString());
    formData.append("Expiration", couponInputs.expirationDis.toString());

    let response;

    if (!id) {
      // create
      response = await createCoupon(formData);
      if (response) {
        setIsLoading(false);
        toastNotify("Coupon created successfully");
        navigate("/coupon/couponList");
      } else {
        toastNotify("An unexpected error occured", "error");
      }
    } else {
      // update
      formData.append("Id", id);
      response = await updateCoupon({ data: formData, id: id });
      if (response) {
        toastNotify("Coupon updated successfully", "success");
        navigate("/coupon/couponList");
      } else {
        toastNotify("An unexpected error occured", "error");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      {!loading && (
        <>
          <h3 className="px-2 text-success">{!id ? "Add" : "Update"} Coupon</h3>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row mt-3">
              <div className="col-md-7">
                <div className="form-floating mb-3 col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Coupon Code"
                    name="code"
                    value={couponInputs.code}
                    onChange={handleCouponInput}
                    required
                  />
                  <label className="ms-2 text-muted">Code</label>
                </div>

                <div className="form-floating mb-3 col-md-12">
                  <input
                    type="number"
                    className="form-control mt-3"
                    placeholder="Enter Discount Amount"
                    name="discountAmount"
                    value={couponInputs.discountAmount}
                    onChange={handleCouponInput}
                  />
                  <label className="ms-2 text-muted">Discount Amount</label>
                </div>
                <div className="form-floating mb-3 col-md-12">
                  <input
                    type="number"
                    className="form-control mt-3"
                    required
                    placeholder="Enter Min Amount"
                    name="minAmount"
                    value={couponInputs.minAmount}
                    onChange={handleCouponInput}
                  />
                  <label className="ms-2 text-muted">Min Amount</label>
                </div>
                <div className="form-floating mb-3 col-md-12">
                  <input
                    type="number"
                    className="form-control mt-3"
                    required
                    placeholder="Enter Expiration Date"
                    name="expirationDis"
                    value={couponInputs.expirationDis}
                    onChange={handleCouponInput}
                  />
                  <label className="ms-2 text-muted">Expiration (Days)</label>
                </div>
                <div className="row">
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-success form-control mt-5"
                    >
                      {!id ? "Add" : "Update"}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-secondary form-control mt-5"
                      onClick={() => navigate("/coupon/couponList")}
                    >
                      Back to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
