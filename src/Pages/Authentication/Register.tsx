import React from "react";
import { useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useRegisterUserMutation } from "../../Apis/authApi";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse, userModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { SD_Roles } from "../../Utility/SD";

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
      <div className="card mt-5 shadow">
        <div className="card-body py-5">
          <form method="post" onSubmit={handleSubmit} className="row px-5">
            {userData && userData.role === SD_Roles.ADMIN ? (
              <h1 className="text-center mb-4 mt-3">
                Registration - Admin Portal
              </h1>
            ) : (
              <h1 className="text-center mb-4">Registration</h1>
            )}
            <div className="form-floating mb-3 col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="userName"
                value={userInput.userName}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Email</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="name"
                value={userInput.name}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Full Name</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                name="phoneNumber"
                value={userInput.phoneNumber}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Phone Number</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={userInput.password}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Password</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={userInput.confirmPassword}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Confirm Password</label>
              {passwordMatchError && (
                <div className="text-danger">{passwordMatchError}</div>
              )}
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Street Address"
                name="streetAddress"
                value={userInput.streetAddress}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Street Address</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={userInput.city}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">City</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                value={userInput.state}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">State</label>
            </div>
            <div className="form-floating mb-3 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Postal Code"
                name="postalCode"
                value={userInput.postalCode}
                onChange={handleUserInput}
                required
              />
              <label className="ms-2 text-muted">Postal Code</label>
            </div>
            {userData && userData.role === SD_Roles.ADMIN && (
              <div className="col-md-12 mb-4 ">
                <select
                  className="form-control form-select p-2"
                  required
                  name="role"
                  value={userInput.role}
                  onChange={handleUserInput}
                >
                  <option disabled value="">
                    --Select Role--
                  </option>
                  <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                  <option value={`${SD_Roles.EMPLOYEE}`}>Employee</option>
                  <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                </select>
              </div>
            )}
            <div className="col-md-12 text-center mb-3 mt-4">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-dark form-control p-2"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
