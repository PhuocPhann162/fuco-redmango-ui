import React, { useEffect, useState } from "react";
import {
  useGetUserInfoAndRolesQuery,
  useRoleManagementMutation,
} from "../../Apis/userApi";
import { MainLoader } from "../../Components/Page/Common";
import { useNavigate, useParams } from "react-router-dom";
import { inputHelper, toastNotify } from "../../Helper";
import { apiResponse } from "../../Interfaces";

export default function PermissionUsers() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setIsLoading] = useState(false);
  const [userInfo, setUserInfor] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
  });
  const [roleList, setRoleList] = useState([]);
  const { data, isLoading } = useGetUserInfoAndRolesQuery(userId);
  const [userInput, setUserInput] = useState({
    role: data?.result?.applicationUser?.role,
  });
  const [roleManagement] = useRoleManagementMutation();

  useEffect(() => {
    if (data) {
      setUserInfor(data?.result?.applicationUser);
      setRoleList(data?.result?.roleList);
      console.log(data?.result?.applicationUser.role);
    }
  }, [data]);

  const handleUserInput = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(userInput.role);

    const formData = new FormData();
    formData.append("Role", userInput.role);

    const response: apiResponse = await roleManagement({
      userId: userId,
      role: formData,
    });
    if (response) {
      if (response.data?.result) {
        setIsLoading(false);
        navigate("/user/manageUsers");
        toastNotify(`Role of User ${userInfo.email} updated successfully`);
      } else {
        setIsLoading(false);
        toastNotify("Something wrong while updating user role", "error");
      }
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="card shadow border-1 my-3 px-5 py-4 mx-5">
            <div className="card-header bg-secondary bg-gradient ml-0 py-3">
              <div className="row">
                <div className="col-12 text-center">
                  <h2 className="text-white py-2">Manage User Role</h2>
                </div>
              </div>
            </div>
            <div className="card-body border p-5">
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="row"
              >
                <input
                  hidden
                  value={userId}
                  name="userId"
                  onChange={handleUserInput}
                />
                <div className="p-3">
                  <div className="form-floating py-2 col-12">
                    <label className="ms-1" style={{ opacity: 0.5 }}>
                      Email
                    </label>
                    <input
                      readOnly
                      value={userInfo && userInfo.email}
                      className="form-control border-0 shadow mt-2"
                    />
                  </div>
                  <div className="form-floating py-2 col-12">
                    <label className="ms-1" style={{ opacity: 0.5 }}>
                      Full Name
                    </label>
                    <input
                      readOnly
                      value={userInfo && userInfo.name}
                      className="form-control border-0 shadow mt-2"
                    />
                  </div>
                  <div className="form-floating py-2 col-12">
                    <label className="ms-1" style={{ opacity: 0.5 }}>
                      Role
                    </label>
                    <select
                      className="form-control form-select shadow mt-2"
                      name="role"
                      value={userInput.role}
                      onChange={handleUserInput}
                      required
                    >
                      <option value="" disabled>
                        --Select Role--
                      </option>
                      {roleList.map((role: any) => (
                        <option
                          key={role.value}
                          value={role.value}
                          selected={role.value === userInfo.role}
                        >
                          {role.text.charAt(0).toUpperCase()! +
                            role.text.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row pt-5">
                    <div className="col-6 col-md-3">
                      <button
                        type="submit"
                        className="btn btn-dark form-control"
                      >
                        {!loading ? "Update Role" : "Updating..."}
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      <button
                        className="btn btn-outline-dark form-control"
                        onClick={() => navigate("/user/manageUsers")}
                      >
                        Back to List
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
