import React, { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useLockUnLockUserMutation,
  useRoleManagementMutation,
} from "../../Apis/userApi";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse, userModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../Components/Layout";
import { toastNotify } from "../../Helper";

let decoration = require("../../Assets/Images/decoration_5.jpg");

export default function ManageUsers() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  // const [isModalShow, setIsModalShow] = useState(false);
  const { data, isLoading } = useGetAllUsersQuery("");
  const [lockUnLockUser] = useLockUnLockUserMutation();
  const [roleManagement] = useRoleManagementMutation();

  useEffect(() => {
    if (data) {
      setUserList(data?.result);
    }
  }, [data]);

  const handleLockUnLockUser = async (id: string) => {
    const response: apiResponse = await lockUnLockUser(id);
    console.log(response);
    if (response) {
      const notify = response.data?.result.toString() ?? "";
      toastNotify(notify);
    }
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center mx-5 mt-5">
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
                <img
                  src={decoration}
                  alt="Decoration"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div className="col">
                <h1 className="text-success">Manage Users</h1>
              </div>
            </div>
          </div>
          <div className="table-responsive px-5 px-md-5">
            <table className="table table-bordered table-striped table-hover px-5 fade-in">
              <thead>
                <tr className="border">
                  <th scope="col" className="col-2">
                    Name
                  </th>
                  <th scope="col" className="col-2">
                    Email
                  </th>
                  <th scope="col" className="col-2">
                    Phone
                  </th>
                  <th scope="col" className="col-2">
                    Role
                  </th>
                  <th scope="col" className="col-3"></th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user: userModel) => (
                  <tr className="border" key={user.id}>
                    <td className="col-2">{user.name}</td>
                    <td className="col-2">{user.email}</td>
                    <td className="col-2">{user.phoneNumber}</td>
                    <td className="col-2">
                      {user.role?.charAt(0).toUpperCase()! +
                        user.role?.slice(1)}
                    </td>
                    <td className="col-3 text-center d-flex w-100 gap-3">
                      {user.lockoutEnd &&
                      new Date(user.lockoutEnd).getTime() > Date.now() ? (
                        <button
                          className="btn btn-warning form-control"
                          onClick={() => handleLockUnLockUser(user.id)}
                        >
                          Unlock <i className="bi bi-unlock-fill"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger form-control"
                          onClick={() => handleLockUnLockUser(user.id)}
                        >
                          Lock <i className="bi bi-lock-fill"></i>
                        </button>
                      )}

                      <button
                        className="btn btn-info form-control"
                        onClick={() =>
                          navigate(`/user/permissionUser/${user.id}`)
                        }
                      >
                        Permission
                      </button>
                      {/* <Modal
                        title=" Are you sure?"
                        content="Do you really want to lock this user? This process cannot be undone."
                        contentButton={
                          new Date(user.lockoutEnd!).getTime() > Date.now()
                            ? "Unlock"
                            : "Lock"
                        }
                        isShow={isModalShow}
                        onClose={() => setIsModalShow(false)}
                        onConfirm={() => handleLockUnLockUser(user.id)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
