import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51OF8z1EbY7sfcwm6dlFeMCvc6YcbHKJQ9SvJvZs9Y6UXMe4RScIjGyDXeIPZ2Y4iCoIuWAdZyFETdKyZ88kZdgKy00MyfC6mGH"
  );
  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
    secretKey:
      "sk_test_51OF8z1EbY7sfcwm6yhvmei46XUb8q870naEZQhmlHul04mz722bx3qjizm2VpNpobbE79p97jl1iQtKMiX7agDoH00vKB1bVWi",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h3 className="text-success">Payment</h3>
            <div className="mt-5">
              <PaymentForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
