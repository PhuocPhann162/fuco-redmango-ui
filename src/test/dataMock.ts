// Mock data for orderHeaderModel
import { SD_Status } from "../Utility/SD";
import {
  menuItemModel,
  orderDetailModel,
  orderHeaderModel,
  userModel,
} from "../Interfaces";

const mockMenuItem: menuItemModel = {
  id: 1,
  name: "Pizza Margherita",
  description: "Classic pizza with tomato sauce, mozzarella, and basil",
  price: 12.99,
  image: "https://example.com/pizza.jpg",
  category: "Fast Food",
  specialTag: "Best Seller",
};

const mockOrderDetails: orderDetailModel[] = [
  {
    orderDetailId: 1,
    orderHeaderId: 101,
    menuItemId: 1,
    menuItem: mockMenuItem,
    quantity: 2,
    itemName: "Pizza Margherita",
    price: 12.99,
  },
  {
    orderDetailId: 2,
    orderHeaderId: 101,
    menuItemId: 2,
    menuItem: {
      id: 2,
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons",
      price: 8.99,
      image: "https://example.com/salad.jpg",
      category: "Vegetable",
      specialTag: "Best Seller",
    },
    quantity: 1,
    itemName: "Caesar Salad",
    price: 8.99,
  },
];

const mockUser: userModel = {
  id: "user123",
  email: "johndoe@example.com",
  fullName: "John Doe",
  phoneNumber: "123-456-7890",
};

const mockOrderHeader: orderHeaderModel = {
  orderHeaderId: 101,
  pickupName: "John Doe",
  pickupEmail: "johndoe@example.com",
  pickupPhoneNumber: "123-456-7890",
  applicationUserId: "user123",
  couponCode: "SAVE20",
  discountAmount: 5.0,
  user: mockUser,
  orderTotal: 39.97,
  orderDate: new Date(),
  stripePaymentIntentID: "pi_1F2E3AbcD4Ef5Gh6Ij7Klm8No9P",
  status: SD_Status.PENDING,
  totalItems: 3,
  orderDetails: mockOrderDetails,
};

const mockOrderHeader_2: orderHeaderModel = {
  orderHeaderId: 102,
  pickupName: "Jane Smith",
  pickupEmail: "janesmith@example.com",
  pickupPhoneNumber: "123-456-7890",
  applicationUserId: "user123",
  couponCode: "SAVE20",
  discountAmount: 5.0,
  user: mockUser,
  orderTotal: 39.97,
  orderDate: new Date(),
  stripePaymentIntentID: "pi_1F2E3AbcD4Ef5Gh6Ij7Klm8No9P",
  status: SD_Status.PENDING,
  totalItems: 3,
  orderDetails: mockOrderDetails,
};

export {
  mockOrderHeader,
  mockOrderHeader_2,
  mockOrderDetails,
  mockUser,
  mockMenuItem,
};
