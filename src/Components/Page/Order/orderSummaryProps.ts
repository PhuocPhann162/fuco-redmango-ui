import { shoppingCartModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export default interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCartModel[];
    couponCode?: string;
    cartTotal?: number;
    userId?: string;
    discount?: number;
    stripePaymentIntentId?: string;
    status?: SD_Status;
  };
  userInput: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}
