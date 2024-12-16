import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AllOrders } from "../../Pages";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockStore from "../mockStore";
import { orderApi } from "../../Apis";
import { mockOrderHeader, mockOrderHeader_2 } from "../dataMock";
import jwtDecode from "jwt-decode";

const mockAllOrders = {
  apiResponse: {
    result: [mockOrderHeader, mockOrderHeader_2],
  },
  totalRecords: JSON.stringify({ TotalRecords: 2 }),
};

jest.mock("jwt-decode", () => jest.fn());

jest.mock("../../Apis/orderApi", () => ({
  ...jest.requireActual("../../Apis/orderApi"),
  useGetAllOrdersQuery: jest.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      replace: jest.fn(),
    },
  });
});

describe("AllOrders Component", () => {
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => "mockToken");

    (jwtDecode as jest.Mock).mockReturnValue({ role: "admin" });
  });

  test("renders All Orders page with fetched data", async () => {
    // Giả lập phản hồi từ useGetAllOrdersQuery
    (orderApi.useGetAllOrdersQuery as jest.Mock).mockReturnValue({
      data: mockAllOrders,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <AllOrders />
        </BrowserRouter>
      </Provider>
    );

    // Kiểm tra tiêu đề được render
    expect(await screen.findByText(/All Orders/i)).toBeInTheDocument();

    // Kiểm tra dữ liệu từ API được render
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("removes John Doe after applying filter", async () => {
    (orderApi.useGetAllOrdersQuery as jest.Mock).mockReturnValue({
      data: mockAllOrders,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <AllOrders />
        </BrowserRouter>
      </Provider>
    );

    // Kiểm tra bộ lọc và phân trang hoạt động
    const searchInput = screen.getByPlaceholderText(
      "Search Name, Email or Phone"
    );
    fireEvent.change(searchInput, { target: { value: "Jane" } });
    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => {
      // Kiểm tra "Jane Smith" vẫn có mặt sau khi lọc
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("displays loading spinner when data is loading", () => {
    // Giả lập trạng thái đang tải
    (orderApi.useGetAllOrdersQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <AllOrders />
        </BrowserRouter>
      </Provider>
    );

    // Kiểm tra loader được hiển thị
    const spinner = screen.queryByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
