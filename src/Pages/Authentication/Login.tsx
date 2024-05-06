import React, { useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import { useLoginUserMutation } from "../../Apis/authApi";
import { apiResponse, userModel } from "../../Interfaces";
import { MainLoader } from "../../Components/Page/Common";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../../Storage/Redux/authSlice";

function Login() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    });
    if (response.data) {
      const { token } = response.data.result;
      const {
        fullName,
        phoneNumber,
        streetAddress,
        city,
        state,
        postalCode,
        id,
        email,
        role,
      }: userModel = jwtDecode(token);
      localStorage.setItem("token", token);
      dispatch(
        setLoggedInUser({
          fullName,
          phoneNumber,
          streetAddress,
          city,
          state,
          postalCode,
          id,
          email,
          role,
        })
      );
      toastNotify("Login successfully");
      navigate("/");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container text-center">
        {loading && <MainLoader />}
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: "10" }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best offer <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for your meals today!{" "}
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                FucoMastery is your ultimate culinary destination, offering a
                diverse menu, insightful content, and seamless ordering for food
                enthusiasts everywhere. Discover, learn, and indulge with us
                today!
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form method="post" onSubmit={handleSubmit}>
                    <h1
                      className="text-center mb-5"
                      style={{ fontFamily: "cursive", fontWeight: "600" }}
                    >
                      Sign in
                    </h1>
                    {/* Email input */}
                    <div className="form-floating form-outline mb-4">
                      <input
                        type="text"
                        value={userInput.userName}
                        className="form-control"
                        placeholder="Enter Username"
                        name="userName"
                        onChange={handleUserInput}
                        required
                      />
                      <label className="ms-2 text-muted">Username</label>
                    </div>

                    {/* Password input */}
                    <div className="form-floating form-outline mb-4">
                      <input
                        type="password"
                        value={userInput.password}
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleUserInput}
                        required
                      />
                      <label className="ms-2 text-muted">Password</label>
                    </div>

                    {/* Checkbox */}
                    <div className="form-check d-flex justify-content-end mb-4">
                      <input
                        style={{
                          backgroundColor: "#5D3D2E",
                          borderColor: "#5D3D2E",
                        }}
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example33"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form2Example33"
                      >
                        Remember password
                      </label>
                    </div>

                    {/* Submit button */}
                    <div className="text-center form-outline">
                      <button
                        disabled={loading}
                        type="submit"
                        className="btn btn-warning form-control bg-gradient text-white"
                        style={{
                          width: "200px",
                          fontWeight: "450",
                        }}
                      >
                        LOGIN
                      </button>
                    </div>

                    {/* Register buttons */}
                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1 text-secondary"
                      >
                        <i className="bi bi-facebook"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1 text-secondary"
                      >
                        <i className="bi bi-google"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1 text-secondary"
                      >
                        <i className="bi bi-twitter-x"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-link btn-floating mx-1 text-secondary"
                      >
                        <i className="bi bi-github"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
