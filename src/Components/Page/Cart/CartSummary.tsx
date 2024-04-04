import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  apiResponse,
  cartItemModel,
  couponModel,
  shoppingCartModel,
  userModel,
} from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import {
  applyOrRemoveCoupon,
  removeFromCart,
  setShoppingCart,
  updateQuantity,
} from "../../../Storage/Redux/shoppingCartSlice";
import {
  useApplyCouponMutation,
  useUpdateShoppingCartMutation,
} from "../../../Apis/shoppingCartApi";
import { inputHelper, toastNotify } from "../../../Helper";
import { MiniLoader } from "../Common";
import { useGetCouponsQuery } from "../../../Apis/couponApi";

function CartSummary() {
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const { data, isLoading } = useGetCouponsQuery(null);
  const [couponList, setCouponList] = useState([]);

  const shoppingCartFromStore: shoppingCartModel = useSelector(
    (state: RootState) => state.shoppingCartStore ?? null
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const [applyCoupon] = useApplyCouponMutation();

  const initialUserData = {
    couponCode: "",
  };

  const [userInput, setUserInput] = useState(initialUserData);

  useEffect(() => {
    if (!loading && data) {
      setCouponList(data.result);
    }
  }, [data]);

  if (shoppingCartFromStore?.cartItems !== null) {
    if (shoppingCartFromStore?.cartItems.length === 0) {
      return (
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div
              style={{ fontWeight: 450 }}
              className="alert alert-secondary empty-cart-alert"
              role="alert"
            >
              Your shopping cart is empty. Add products to continue shopping 🍜
            </div>
          </div>
        </div>
      );
    }
  }

  const handleUserInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const hanldeUpdateQuantity = (
    updateQuantityBy: number,
    cartItem: cartItemModel
  ) => {
    if (
      (updateQuantityBy === -1 && cartItem.quantity === 1) ||
      updateQuantityBy === 0
    ) {
      // remove the item

      updateShoppingCart({
        userId: userData.id,
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: 0,
      });

      dispatch(removeFromCart({ cartItem, quantity: 0 }));

      if (shoppingCartFromStore?.cartItems) {
        if (shoppingCartFromStore.cartItems.length === 1) {
          dispatch(
            setShoppingCart({
              cartItems: [],
              cartTotal: 0,
              couponCode: "",
              discount: 0,
            })
          );
        }
      }
    } else {
      // update the quantity with the new quantity
      updateShoppingCart({
        userId: userData.id,
        menuItemId: cartItem.menuItem?.id,
        updateQuantityBy: updateQuantityBy,
      });

      dispatch(
        updateQuantity({
          cartItem,
          quantity: cartItem.quantity! + updateQuantityBy,
        })
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data }: apiResponse = await applyCoupon({
      shoppingCart: shoppingCartFromStore,
      couponCode: userInput.couponCode,
      userId: userData.id,
    });

    if (data?.result && data.isSuccess) {
      if (
        shoppingCartFromStore.couponCode == "" ||
        !shoppingCartFromStore.couponCode
      ) {
        dispatch(applyOrRemoveCoupon({ couponCode: "", discount: 0 }));
        userInput.couponCode = "";
        toastNotify("Apply coupon successful");
      } else {
        dispatch(
          applyOrRemoveCoupon({
            couponCode: data.result.couponCode,
            discount: data.result.discount,
          })
        );
        toastNotify("Remove coupon successful");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container px-4 py-3">
      <h3
        style={{ fontWeight: "650", color: "#5D3D2E", fontFamily: "" }}
        className="ms-4"
      >
        Cart Summary
      </h3>
      <hr />
      {shoppingCartFromStore &&
        shoppingCartFromStore?.cartItems?.map(
          (cartItem: cartItemModel, index: number) => (
            <div
              key={index}
              className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
              style={{ backgroundColor: "#FAFAFA" }}
            >
              <div className="p-3">
                <img
                  src={cartItem.menuItem?.image}
                  alt=""
                  width={"120px"}
                  className="rounded-circle"
                />
              </div>

              <div className="p-2 mx-3" style={{ width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 style={{ fontWeight: 500, color: "#5D3D2E" }}>
                    {cartItem.menuItem?.name}
                  </h4>
                  <h4>
                    $
                    {(cartItem.quantity! * cartItem.menuItem!.price).toFixed(2)}
                  </h4>
                </div>
                <div className="flex-fill">
                  <span
                    style={{ fontWeight: 450 }}
                    className="fs-5 text-secondary"
                  >
                    ${cartItem.menuItem!.price}
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                    style={{
                      width: "100px",
                      height: "43px",
                    }}
                  >
                    <span style={{ color: "#ffa94d" }} role="button">
                      <i
                        className="bi bi-dash-circle-fill"
                        onClick={() => hanldeUpdateQuantity(-1, cartItem)}
                      ></i>
                    </span>
                    <span>
                      <b>{cartItem.quantity}</b>
                    </span>
                    <span style={{ color: "#ffa94d" }} role="button">
                      <i
                        className="bi bi-plus-circle-fill"
                        onClick={() => hanldeUpdateQuantity(1, cartItem)}
                      ></i>
                    </span>
                  </div>

                  <button
                    className="btn btn-outline-danger mb-1"
                    onClick={() => hanldeUpdateQuantity(0, cartItem)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      <form onSubmit={handleSubmit}>
        {shoppingCartFromStore?.couponCode == null ||
        shoppingCartFromStore?.couponCode === "" ? (
          <div className="form-group mt-3 ms-4 d-flex align-items-center w-100">
            <span className="p-2" style={{ fontWeight: 500 }}>
              Promotion Code:{" "}
            </span>
            <div className="mr-auto">
              <select
                value={userInput.couponCode}
                className="form-control form-select"
                name="couponCode"
                onChange={handleUserInput}
                required
              >
                <option value="">Select your code</option>
                {couponList.map((coupon: couponModel) => {
                  if (coupon.minAmount! <= shoppingCartFromStore?.cartTotal!) {
                    return (
                      <option key={coupon.id} value={coupon.code}>
                        {coupon.discountAmount}$ OFF (Apply if Subtotal {`>`} $
                        {coupon.minAmount})
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-success mx-2"
              disabled={loading}
            >
              {loading ? <MiniLoader /> : "Apply Coupon"}
            </button>
          </div>
        ) : (
          <div className="form-group mt-3 d-flex align-items-center w-100">
            <h6 className="p-2">Coupon: </h6>
            <div className="mr-auto">
              <select
                value={userInput.couponCode}
                className="form-control form-select"
                name="couponCode"
                onChange={handleUserInput}
                required
                disabled
              >
                <option value={shoppingCartFromStore?.couponCode}>
                  {shoppingCartFromStore?.discount}$ OFF
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-warning mx-2"
              disabled={loading}
            >
              {loading ? <MiniLoader /> : "Remove"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CartSummary;
