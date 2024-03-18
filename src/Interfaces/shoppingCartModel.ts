import cartItemModel from "./cartItemModel";

export default interface shoppingCartModel {
  id?: number;
  userId?: string;
  couponCode?: string;
  cartItems: cartItemModel[];
  discount?: number;
  cartTotal?: number;
  stripePaymentIntentId?: string;
  clientSecret?: string;
}
