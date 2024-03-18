import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
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
      const { fullName, id, email, role }: userModel = jwt_decode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
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

          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route path="/payment" element={<Payment />}></Route>

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

          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
