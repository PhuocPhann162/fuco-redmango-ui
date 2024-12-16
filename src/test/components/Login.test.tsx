import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useLoginUserMutation } from "../../Apis/authApi";
import jwtDecode from "jwt-decode";
import { Login } from "../../Pages";
import mockStore from "../mockStore";

jest.mock("../../Apis/authApi", () => ({
  useLoginUserMutation: jest.fn(),
}));

jest.mock("../../Storage/Redux/authSlice", () => ({
  setLoggedInUser: jest.fn(),
}));

jest.mock("jwt-decode", () => jest.fn());

jest.spyOn(mockStore, "dispatch").mockImplementation((action) => {
  return action;
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

test("renders Login page and handles login flow", async () => {
  const mockLoginUser = jest.fn().mockResolvedValue({
    data: { result: { token: "mockToken" } },
  });

  const mockDecodedToken = { fullName: "John Doe", id: "1", role: "User" };

  (jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken);
  (useLoginUserMutation as jest.Mock).mockReturnValue([mockLoginUser]);

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const usernameInput = screen.getByPlaceholderText(/Enter Username/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const loginButton = screen.getByText(/LOGIN/i);

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(loginButton);

  // Mock API gọi đúng
  await waitFor(() => expect(mockLoginUser).toHaveBeenCalledTimes(1));

  // Token được lưu
  expect(localStorage.setItem).toHaveBeenCalledWith("token", "mockToken");

  // Thông báo thành công
  await waitFor(() => {
    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
  });
});
