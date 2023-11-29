import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toastNotify } from "../../../Helper";
import orderSummaryProps from "../Order";
import { cartItemModel, orderDetailsDTOModel } from "../../../Interfaces";
import { useCreateOrderMutation } from "../../../Apis/orderApi";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const createItem = useState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotify("An unexpected error occured", "error");
      setIsProcessing(false);
    } else {
      console.log(result);

      // "stripePaymentIntentID": "string",
      // "status": "string",
      let totalItems = 0;

      const orderDetailsDTO: orderDetailsDTOModel[] = [];
      data.cartItems.map((item: cartItemModel) => {
        const tempOrderDetails: orderDetailsDTOModel = {
          menuItemId: item.menuItemId!,
          quantity: item.quantity!,
          itemName: item.menuItem?.name!,
          price: item.menuItem?.price!,
        };
        orderDetailsDTO.push(tempOrderDetails);
        totalItems += item.quantity!;
      });

      const response = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        orderTotal: data.cartTotal,
        totalItems: totalItems,
        applicationUserId: data.userId,
        stripePaymentIntentID: data.stripePaymentIntentId,
        status: result.paymentIntent.status,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success w-100 mt-5">Submit Order</button>
    </form>
  );
};

export default PaymentForm;
