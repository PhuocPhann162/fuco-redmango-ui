import React from "react";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { MainLoader } from "../Components/Page/Common";
import { cartItemModel } from "../Interfaces";
import { CartSummary } from "../Components/Page/ShoppingCarts";

function ShoppingCart() {
  const { data, isLoading } = useGetShoppingCartQuery(
    "59acaa8e-160f-4a88-b755-ba23cb8cdd62"
  );

  return (
    <div className="row w-100" style={{ marginTop: "10px" }}>
      <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
        <CartSummary />
      </div>
      <div className="col-lg-6 col-12 p-4">User Details</div>
    </div>
  );
}

export default ShoppingCart;
