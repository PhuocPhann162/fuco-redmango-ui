import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { toastNotify } from "../../../Helper";
import { useCreateOrderMutation } from "../../../Apis/orderApi";
import { SD_Status } from "../../../Utility/SD";
import { useNavigate } from "react-router-dom";
import { CheckOutResultModal } from "../../UI/Invoice";
import orderSummaryProps from "../Order";
import { cartItemModel, orderDetailsDTOModel, apiResponse } from "../../../Interfaces";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState<orderSummaryProps | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const InvoiceData = {
    data: data,
    userInput: userInput,
  };

  const handleOpenModal = () => {
    setOrder(InvoiceData);
    setIsSuccess(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      toastNotify("An unexpected error occurred", "error");
      setIsProcessing(false);
    } else {
      let totalItems = 0;

      const orderDetailsDTO: orderDetailsDTOModel[] = [];
      data.cartItems?.map((item: cartItemModel) => {
        const tempOrderDetails: orderDetailsDTOModel = {
          menuItemId: item.menuItemId!,
          quantity: item.quantity!,
          itemName: item.menuItem?.name!,
          price: item.menuItem?.price!,
        };
        orderDetailsDTO.push(tempOrderDetails);
        totalItems += item.quantity!;
        return null;
      });

      const response: apiResponse = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        orderTotal: data.cartTotal,
        totalItems: totalItems,
        discountAmount: data.discount,
        couponCode: data.couponCode,
        applicationUserId: data.userId,
        stripePaymentIntentID: data.stripePaymentIntentId,
        status:
          result.paymentIntent.status === "succeeded"
            ? SD_Status.CONFIRMED
            : SD_Status.PENDING,
        orderDetailsDTO: orderDetailsDTO,
      });

      if (response) {
        if (response.data?.result.status === SD_Status.CONFIRMED) {
          // navigate(
          //   `/order/orderConfirmed/${response.data.result.orderHeaderId}`
          // );
          handleOpenModal();
        } else {
          setIsProcessing(false);
          navigate("/failed");
        }
      } else {
        toastNotify("An unexpected error occurred", "error");
        navigate("/failed");
      }
    }
    setIsProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          disabled={!stripe || isProcessing}
          className="btn btn-success w-100 mt-5"
        >
          <span id="button-text">
            {isProcessing ? "Processing..." : "Submit Order"}
          </span>
        </button>
      </form>
      {order && (
        <CheckOutResultModal
          order={order}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
};

export default PaymentForm;