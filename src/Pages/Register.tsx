import React from "react";
import { useState } from "react";
import { inputHelper, toastNotify } from "../Helper";
import { useRegisterUserMutation } from "../Apis/authApi";
import { MainLoader } from "../Components/Page/Common";
import { apiResponse, userModel } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { SD_Roles } from "../Utility/SD";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    name: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    role: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);

    if (name === "confirmPassword" && value !== userInput.password) {
      setPasswordMatchError(
        "The password and confirmation password do not match."
      );
    } else {
      setPasswordMatchError("");
    }
  };

  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      phoneNumber: userInput.phoneNumber,
      password: userInput.password,
      confirmPassword: userInput.confirmPassword,
      streetAddress: userInput.streetAddress,
      city: userInput.city,
      state: userInput.state,
      postalCode: userInput.postalCode,
      role: userInput.role,
    });
    if (response.data) {
      if (userInput.role === "") {
        toastNotify("Registration new account successfully! ");
      } else {
        toastNotify("Registration successfully! Please login to continue.");
        navigate("/login");
      }
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      {loading && <MainLoader />}
      <div className="card mt-5">
        <div className="card-body">
          <form method="post" onSubmit={handleSubmit}>
            {userData && userData.role === SD_Roles.ADMIN ? (
              <h1 className="text-center mb-4">Register - Admin Portal</h1>
            ) : (
              <h1 className="text-center mb-4">Register</h1>
            )}
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full Name"
                  name="name"
                  value={userInput.name}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  value={userInput.phoneNumber}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  value={userInput.password}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  value={userInput.confirmPassword}
                  onChange={handleUserInput}
                  required
                />
                {passwordMatchError && (
                  <div className="text-danger">{passwordMatchError}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Street Address"
                  name="streetAddress"
                  value={userInput.streetAddress}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  name="city"
                  value={userInput.city}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter State"
                  name="state"
                  value={userInput.state}
                  onChange={handleUserInput}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Postal Code"
                  name="postalCode"
                  value={userInput.postalCode}
                  onChange={handleUserInput}
                  required
                />
              </div>
            </div>
            {userData && userData.role === SD_Roles.ADMIN && (
              <div className="row mb-3">
                <div className="col">
                  <select
                    className="form-control form-select"
                    required
                    name="role"
                    value={userInput.role}
                    onChange={handleUserInput}
                  >
                    <option value="">--Select Role--</option>
                    <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                    <option value={`${SD_Roles.EMPLOYEE}`}>Employee</option>
                    <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                  </select>
                </div>
              </div>
            )}
            <div className="row mb-3">
              <div className="col text-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-success form-control"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
