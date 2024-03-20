import { SD_Status } from "../Utility/SD";
import orderDetailModel from "./orderDetailModel";
import userModel from "./userModel";

export default interface orderHeaderModel {
  orderHeaderId?: number;
  pickupName?: string;
  pickupEmail?: string;
  pickupPhoneNumber?: string;
  applicationUserId?: string;
  couponCode?: string;
  discountAmount?: number;
  user?: userModel;
  orderTotal?: number;
  orderDate?: Date;
  stripePaymentIntentID?: string;
  status?: SD_Status;
  totalItems?: number;
  orderDetails?: orderDetailModel[];
}
