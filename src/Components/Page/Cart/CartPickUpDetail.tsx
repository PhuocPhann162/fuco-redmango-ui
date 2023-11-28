import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiResponse, cartItemModel, userModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../Common";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

function CartPickUpDetail() {
  const [loading, setIsLoading] = useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? null
  );

  let grandTotal = 0;
  let totalItems = 0;
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();

  shoppingCartFromStore.map((cartItem: cartItemModel) => {
    grandTotal += cartItem.quantity! * cartItem.menuItem?.price!;
    totalItems += cartItem.quantity!;
    return null;
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);
   
    if (data?.result && data.isSuccess) {
      navigate("/payment", {
        state: { apiResult: data?.result, userInput: userInput },
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            name="name"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
}

export default CartPickUpDetail;
