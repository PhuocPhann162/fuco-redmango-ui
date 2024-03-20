import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  CouponList,
  CouponUpsert,
  Home,
  Information,
  Login,
  ManageUsers,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  PermissionUsers,
  Register,
  ShoppingCart,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import { setLoggedInUser } from "../Storage/Redux/authSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(true);
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const { data, isLoading } = useGetShoppingCartQuery(userData.id, {
    skip: skip,
  });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const {
        fullName,
        phoneNumber,
        streetAddress,
        city,
        state,
        postalCode,
        id,
        email,
        role,
      }: userModel = jwt_decode(localToken);
      dispatch(
        setLoggedInUser({
          fullName,
          phoneNumber,
          streetAddress,
          city,
          state,
          postalCode,
          id,
          email,
          role,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setShoppingCart(data.result));
    }
  }, [data]);

  useEffect(() => {
    if (userData.id) {
      setSkip(false);
    }
  }, [userData]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          {/* Order */}
          <Route
            path="/order/orderConfirmed/:id"
            element={<OrderConfirmed />}
          ></Route>
          <Route path="/order/myOrders/" element={<MyOrders />}></Route>
          <Route
            path="/order/orderDetails/:id"
            element={<OrderDetails />}
          ></Route>
          <Route path="/order/allOrders" element={<AllOrders />}></Route>
          {/* MenuItem */}
          <Route
            path="/menuItem/menuItemList"
            element={<MenuItemList />}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert"
            element={<MenuItemUpsert />}
          ></Route>
          <Route
            path="/menuItem/menuItemUpsert/:id"
            element={<MenuItemUpsert />}
          ></Route>
          {/* Coupon */}
          <Route path="/coupon/couponList" element={<CouponList />} />
          <Route path="/coupon/couponUpsert" element={<CouponUpsert />}></Route>
          <Route
            path="/coupon/couponUpsert/:id"
            element={<CouponUpsert />}
          ></Route>
          {/* Manage User */}
          <Route path="/manageUser" element={<ManageUsers />} />
          <Route path="/user/permissionUser" element={<PermissionUsers />} />

          <Route path="/Information" element={<Information/>}></Route>

          <Route path="/*" element={<NotFound />}></Route>

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
