import { render, screen, fireEvent } from "@testing-library/react";
import { Revenue } from "../../Pages";
import "@testing-library/jest-dom";

jest.mock("../../Components/Page/Statistics", () => ({
  DailyOrders: jest.fn(() => <div>Daily Orders Chart</div>),
  DailyRevenue: jest.fn(() => <div>Daily Revenue Chart</div>),
  MonthlyOrders: jest.fn(() => <div>Monthly Orders Chart</div>),
  MonthlyRevenue: jest.fn(() => <div>Monthly Revenue Chart</div>),
  YearlyOrders: jest.fn(() => <div>Yearly Orders Chart</div>),
  YearlyRevenue: jest.fn(() => <div>Yearly Revenue Chart</div>),
}));

const decorationMock = "mock_decoration_image.jpg";
jest.mock("../../Assets/Images/decoration_6.jpg", () => decorationMock);

describe("Revenue Component", () => {
  test("renders Revenue component and defaults to Daily Revenue", () => {
    render(<Revenue />);

    // Kiểm tra tiêu đề
    expect(screen.getByText(/Statistics/i)).toBeInTheDocument();

    // Kiểm tra hình ảnh được render
    const decorationImage = screen.getByAltText("Decoration Header");
    expect(decorationImage).toHaveAttribute("src", decorationMock);

    // Kiểm tra chart mặc định là Daily Revenue
    expect(screen.getByText(/Daily Revenue/i)).toBeInTheDocument();
  });

  test("changes chart when radio buttons are selected", () => {
    render(<Revenue />);

    // Chuyển sang Monthly Revenue
    const monthlyRevenueRadio = screen.getByLabelText(/Monthly Revenue/i);
    fireEvent.click(monthlyRevenueRadio);
    expect(screen.getByText(/Monthly Revenue/i)).toBeInTheDocument();

    // Chuyển sang Yearly Orders
    const yearlyOrdersRadio = screen.getByLabelText(/Yearly Orders/i);
    fireEvent.click(yearlyOrdersRadio);
    expect(screen.getByText(/Yearly Orders/i)).toBeInTheDocument();

    // Chuyển sang Daily Orders
    const dailyOrdersRadio = screen.getByLabelText(/Daily Orders/i);
    fireEvent.click(dailyOrdersRadio);
    expect(screen.getByText(/Daily Orders/i)).toBeInTheDocument();
  });

  test("renders all radio buttons and handles their functionality", () => {
    render(<Revenue />);

    const radioLabels = [
      "Daily Revenue",
      "Monthly Revenue",
      "Yearly Revenue",
      "Daily Orders",
      "Monthly Orders",
      "Yearly Orders",
    ];

    radioLabels.forEach((label) => {
      const radio = screen.getByLabelText(label);
      expect(radio).toBeInTheDocument();
      fireEvent.click(radio);
      expect(radio).toBeChecked();
    });
  });
});
