import React from "react";
import { SD_Roles } from "../Utility/SD";
import { useState } from "react";
import { inputHelper } from "../Helper";
import { useRegisterUserMutation } from "../Apis/authApi";
import { MiniLoader } from "../Components/Page/Common";
import { apiResponse } from "../Interfaces";

function Register() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    userName: "",
    name: "",
    password: "",
    role: "",
  });

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const [registerUser] = useRegisterUserMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const resposne: apiResponse = await registerUser({
      userName: userInput.userName,
      name: userInput.name,
      password: userInput.password,
      role: userInput.role,
    });

    setLoading(false);
  };

  return (
    <div className="container text-center">
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
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
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
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
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              name="role"
              value={userInput.role}
              onChange={handleUserInput}
            >
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button disabled={loading} type="submit" className="btn btn-success">
            {loading ? <MiniLoader /> : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
