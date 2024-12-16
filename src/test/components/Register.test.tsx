import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useRegisterUserMutation } from "../../Apis/authApi";
import mockStore from "../mockStore";
import { Register } from "../../Pages";

jest.mock("../../Apis/authApi", () => ({
  useRegisterUserMutation: jest.fn(),
}));

jest.spyOn(mockStore, "dispatch").mockImplementation((action) => {
  return action;
});

test("renders Register page and handles registration flow", async () => {
  const mockRegisterUser = jest.fn().mockResolvedValue({
    data: { result: "User registered successfully" },
  });

  (useRegisterUserMutation as jest.Mock).mockReturnValue([mockRegisterUser]);

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    </Provider>
  );

  // Input fields
  const emailInput = screen.getByPlaceholderText(/Email/i);
  const fullNameInput = screen.getByPlaceholderText(/Full Name/i);
  const phoneInput = screen.getByPlaceholderText(/Phone Number/i);
  const passwordInputs = screen.getAllByPlaceholderText(/Password/i);
  const passwordInput = passwordInputs[0];
  const confirmPasswordInput = passwordInputs[1];
  const streetAddressInput = screen.getByPlaceholderText(/Street Address/i);
  const cityInput = screen.getByPlaceholderText(/City/i);
  const stateInput = screen.getByPlaceholderText(/State/i);
  const postalCodeInput = screen.getByPlaceholderText(/Postal Code/i);
  const registerButton = screen.getByText(/Register/i);

  // Fill out form
  fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
  fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  fireEvent.change(phoneInput, { target: { value: "1234567890" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
  fireEvent.change(streetAddressInput, {
    target: { value: "123 Test Street" },
  });
  fireEvent.change(cityInput, { target: { value: "Test City" } });
  fireEvent.change(stateInput, { target: { value: "Test State" } });
  fireEvent.change(postalCodeInput, { target: { value: "12345" } });

  // Click register button
  fireEvent.click(registerButton);

  // Mock API call
  await waitFor(() => expect(mockRegisterUser).toHaveBeenCalledTimes(1));

  // Mock API response validation
  expect(mockRegisterUser).toHaveBeenCalledWith({
    userName: "testuser@example.com",
    name: "John Doe",
    phoneNumber: "1234567890",
    password: "password123",
    confirmPassword: "password123",
    streetAddress: "123 Test Street",
    city: "Test City",
    state: "Test State",
    postalCode: "12345",
    role: "",
  });

  // Successful registration message
  await waitFor(() => {
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
  });
});
