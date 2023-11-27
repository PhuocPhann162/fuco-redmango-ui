import React from "react";
import { SD_Roles } from "../Utility/SD";
import { useState } from "react";
import { userModel } from "../Interfaces";
import { inputHelper } from "../Helper";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registerInput, setRegisterInput] = useState({
    userName: "",
    name: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const tempData = inputHelper(e, registerInput);
    setRegisterInput(tempData);
  };

  return (
    <div className="container text-center">
      <form method="post">
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="userName"
              value={registerInput.userName}
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
              value={registerInput.name}
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
              value={registerInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select className="form-control form-select" required>
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
