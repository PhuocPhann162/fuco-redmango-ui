import orderDetailModel from "./orderDetailModel";
import userModel from "./userModel";

export default interface orderHeaderModel {
  orderHeaderId?: number;
  pickupName?: string;
  pickupEmail?: string;
  pickupPhoneNumber?: string;
  applicationUserId?: string;
  user?: userModel;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentID?: string;
  status?: string;
  totalItems?: number;
  orderDetails?: orderDetailModel[];
}
