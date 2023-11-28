import { shoppingCartModel } from "../../../Interfaces";

export default interface orderSummaryProps {
  data: {
    id: number;
    cartItems: shoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
