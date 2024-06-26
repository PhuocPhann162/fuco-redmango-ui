import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  apiResponse,
  cartItemModel,
  shoppingCartModel,
  userModel,
} from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../Common";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { useNavigate } from "react-router-dom";

function CartPickUpDetail() {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [initiatePayment] = useInitiatePaymentMutation();
  const shoppingCartFromStore: shoppingCartModel = useSelector(
    (state: RootState) => state.shoppingCartStore ?? null
  );

  let totalItems = 0;
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    streetAdress: userData.streetAddress,
    phoneNumber: userData.phoneNumber,
    city: userData.city,
    state: userData.state,
    postalCode: userData.postalCode,
  };

  const [userInput, setUserInput] = useState(initialUserData);

  if (shoppingCartFromStore?.cartItems) {
    shoppingCartFromStore?.cartItems.map((cartItem: cartItemModel) => {
      totalItems += cartItem.quantity!;

      return null;
    });
  }

  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      streetAdress: userData.streetAddress,
      phoneNumber: userData.phoneNumber,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
    });
  }, [userData]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.id);
    console.log(data);

    if (data?.result && data.isSuccess) {
      navigate("/payment", {
        state: { apiResult: data?.result, userInput: userInput },
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="border shadow pb-5 pt-3">
      <h1
        style={{
          fontWeight: "450",
          color: "#5D3D2E",
          fontFamily: "sans-serif",
        }}
        className="text-center"
      >
        Pickup Details
      </h1>
      <hr className="text-white" />
      <form onSubmit={handleSubmit} className="row col-11 mx-auto">
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="Name..."
            name="name"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">Full Name</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            name="email"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">Email</label>
        </div>
        <div className="form-floating mb-3 col-md-12">
          <input
            type="text"
            value={userInput.streetAdress}
            className="form-control"
            placeholder="email..."
            name="streetAddress"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">Address</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">Phone Number</label>
        </div>
        <div className="form-floating mb-3 col-md-6">
          <input
            type="text"
            value={userInput.city}
            className="form-control"
            placeholder="city..."
            name="city"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">City</label>
        </div>
        <div className="form-floating mb-2 col-md-6">
          <input
            type="text"
            value={userInput.state}
            className="form-control"
            placeholder="state..."
            name="state"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">State</label>
        </div>
        <div className="form-floating mb-2 col-md-6">
          <input
            type="text"
            value={userInput.postalCode}
            className="form-control"
            placeholder="postal code..."
            name="postalCode"
            onChange={handleUserInput}
            required
          />
          <label className="ms-2 text-muted">Postal Code</label>
        </div>

        <div className="p-3" style={{ background: "ghostwhite" }}>
          <div className="d-flex justify-content-between mb-1 text-secondary">
            <span>No of items</span>
            <span>{totalItems}</span>
          </div>
          <div className="d-flex justify-content-between mb-1 text-secondary">
            <span>Subtotal</span>
            <span>
              $
              {(
                shoppingCartFromStore?.cartTotal! +
                shoppingCartFromStore?.discount!
              ).toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between mb-3 text-secondary">
            <span>Discount</span>
            <span>
              -$
              {shoppingCartFromStore?.discount != null
                ? shoppingCartFromStore?.discount.toFixed(2)
                : 0}
            </span>
          </div>
          <hr />
          <div
            className="d-flex justify-content-between"
            style={{ fontWeight: 700 }}
          >
            <h5>Total</h5>
            <h5>${shoppingCartFromStore?.cartTotal!.toFixed(2)}</h5>
          </div>
        </div>
        <button
          style={{ backgroundColor: "#5D3D2E" }}
          type="submit"
          className="btn btn-lg text-white mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
        <button
          type="button"
          className="btn btn-lg btn-outline-secondary mt-2"
          onClick={() => navigate("/")}
        >
          Countinue Shopping
        </button>
      </form>
    </div>
  );
}

export default CartPickUpDetail;
