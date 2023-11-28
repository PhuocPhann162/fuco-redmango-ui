import { PaymentElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  return (
    <form>
      <PaymentElement />
      <button className="btn btn-success w-100 mt-5">Submit Order</button>
    </form>
  );
};

export default PaymentForm;
