import React, { useRef } from "react";
import orderSummaryProps from "../../Page/Order";
import { useReactToPrint } from "react-to-print";
import Modal from 'react-bootstrap/Modal';
import st from "../../Style/invoice.module.css";
import { cartItemModel } from "../../../Interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

interface PrintComponentProps {
  order: orderSummaryProps;
  isSuccess: boolean;
}

const truncateString = (str: string, maxLength: number) => {
  if (str === null) {
    return "";
  }
  return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
};

const PrintComponent: React.FC<PrintComponentProps> = ({ order, isSuccess }) => {
  const totalPrice = order.data.cartTotal! - (order.data.discount ? order.data.discount : 0);
  return (
    <div className=" container mt-3">
      <div className="card ml-5 mr-5">
        <div className="card-header">
          Invoice <strong>#{order.data.id}</strong>
          <span className="float-right"> <strong>Status:</strong> </span>
        </div>
        <div className="card-body">
        <div className="mt-2">
            <div className="border py-3 px-2">Name : {order.userInput.name}</div>
            <div className="border py-3 px-2">Email : {order.userInput.email}</div>
            <div className="border py-3 px-2">
              Phone : {order.userInput.phoneNumber}
            </div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {order.data.cartItems?.map(
                  (cartItem: cartItemModel, index: number) => (
                    <div className="d-flex" key={index}>
                      <div className="d-flex w-100 justify-content-between">
                        <p>{cartItem.menuItem?.name}</p>
                        <p>
                          ${cartItem.menuItem?.price} x {cartItem.quantity!} =
                        </p>
                      </div>
                      <p style={{ width: "70px", textAlign: "right" }}>
                        $
                        {(cartItem.menuItem?.price ?? 0) *
                          (cartItem.quantity ?? 0)}
                      </p>
                    </div>
                  )
                )}

                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <span>Total Cart Price: </span>
                  <h4 className="" style={{ textAlign: "right" }}>
                    ${order.data.cartTotal?.toFixed(2)}
                  </h4>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Discount Amount: </span>
                  <h4 className="" style={{ textAlign: "right" }}>
                    ${order.data.discount?.toFixed(2)}
                  </h4>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>Total Price After Discount: </span>
                  <h4 className="text-danger" style={{ textAlign: "right" }}>
                    ${totalPrice.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <strong>Note:</strong> Payment is due within 30 days
        </div>
      </div>
    </div>
  );
};

export const CheckOutResultModal: React.FC<{ order: orderSummaryProps, isOpen: boolean, onClose: Function, isSuccess: boolean }> = (props) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="container">
      <Modal className="wider-modal-dialog" size="xl" show={props.isOpen} onHide={() => { props.onClose() }}>
        <Modal.Header closeButton>
          <h3 style={{color: 'var(--blue-color)'}}>Invoice</h3>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-end flex-column align-items-center">
        <button onClick={handlePrint} className="btn btn-outline-primary"><FontAwesomeIcon icon={faPrint} /></button>
          <div ref={componentRef}>
            <PrintComponent order={props.order} isSuccess={props.isSuccess} />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
        </Modal.Footer>
      </Modal>
    </div>
  )
};
