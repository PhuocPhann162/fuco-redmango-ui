import { render, screen, waitFor } from "@testing-library/react";
import { CouponList } from "../../Pages";
import couponApi from "../../Apis/couponApi";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockStore from "../mockStore";

const mockCoupons = {
  result: [
    {
      id: 1,
      code: "DISCOUNT10",
      discountAmount: 10,
      minAmount: 50,
      expiration: new Date(),
    },
    {
      id: 2,
      code: "SAVE20",
      discountAmount: 20,
      minAmount: 100,
      expiration: new Date(),
    },
  ],
};

jest.mock("../../Apis/couponApi", () => ({
  ...jest.requireActual("../../Apis/couponApi"),
  useGetCouponsQuery: jest.fn(),
  useDeleteCouponMutation: jest.fn(),
}));

test("renders Coupon List with fetched data", async () => {
  // Giả lập phản hồi từ useGetCouponsQuery
  (couponApi.useGetCouponsQuery as jest.Mock).mockReturnValue({
    data: mockCoupons,
    isLoading: false,
  });

  (couponApi.useDeleteCouponMutation as jest.Mock).mockReturnValue([
    jest.fn().mockResolvedValue({}),
  ]);

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <CouponList />
      </BrowserRouter>
    </Provider>
  );

  // Kiểm tra tiêu đề được render
  expect(await screen.findByText(/Coupon List/i)).toBeInTheDocument();

  // Kiểm tra dữ liệu từ API được render đúng
  await waitFor(() => {
    expect(screen.getByText("DISCOUNT10")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("SAVE20")).toBeInTheDocument();
  });

  // Kiểm tra các thông tin khác
  expect(screen.getByText("$ 10.00")).toBeInTheDocument();
  expect(screen.getByText("$ 20.00")).toBeInTheDocument();
});
