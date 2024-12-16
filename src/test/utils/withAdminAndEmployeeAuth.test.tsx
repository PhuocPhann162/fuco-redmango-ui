import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import jwtDecode from "jwt-decode";
import "@testing-library/jest-dom";
import { withAdminAndEmployeeAuth } from "../../HOC";

jest.mock("jwt-decode", () => jest.fn()); // Mock jwtDecode

beforeAll(() => {
  // Mock window.location.replace globally
  Object.defineProperty(window, "location", {
    writable: true,
    value: {
      replace: jest.fn(),
    },
  });
});

describe("withAdminAndEmployeeAuth HOC", () => {
  const MockComponent = () => <div>Mock Component</div>; // Component giả lập
  const WrappedComponent = withAdminAndEmployeeAuth(MockComponent);

  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.getItem = jest.fn(() => "mockToken");
  });

  test("renders wrapped component when role is ADMIN", async () => {
    // Mock jwtDecode để trả về role ADMIN
    (jwtDecode as jest.Mock).mockReturnValue({ role: "admin" });

    render(<WrappedComponent />);

    // Kiểm tra WrappedComponent được render
    expect(await screen.findByText(/Mock Component/i)).toBeInTheDocument();
  });

  test("renders wrapped component when role is EMPLOYEE", async () => {
    // Mock jwtDecode để trả về role EMPLOYEE
    (jwtDecode as jest.Mock).mockReturnValue({ role: "employee" });

    render(<WrappedComponent />);

    // Kiểm tra WrappedComponent được render
    expect(await screen.findByText(/Mock Component/i)).toBeInTheDocument();
  });

  test("redirects to /accessDenied when role is neither ADMIN nor EMPLOYEE", async () => {
    const replaceMock = jest.fn();
    window.location.replace = replaceMock; // Mock window.location.replace

    // Mock jwtDecode để trả về role không hợp lệ
    (jwtDecode as jest.Mock).mockReturnValue({ role: "USER" });

    render(<WrappedComponent />);

    // Kiểm tra redirect tới /accessDenied
    expect(replaceMock).toHaveBeenCalledWith("/accessDenied");
  });

  test("redirects to /login when no token is found", async () => {
    const replaceMock = jest.fn();
    window.location.replace = replaceMock; // Mock window.location.replace

    // Mock không có token trong localStorage
    Storage.prototype.getItem = jest.fn(() => null);

    render(<WrappedComponent />);

    // Kiểm tra redirect tới /login
    await waitFor(() => {
      expect(replaceMock).toHaveBeenCalledWith("/login");
    });
  });
});
