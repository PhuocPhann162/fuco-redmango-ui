import React, { useEffect } from "react";
import { useGetUserInfoAndRolesQuery } from "../../Apis/userApi";
import { MainLoader } from "../../Components/Page/Common";
import { useParams } from "react-router-dom";

export default function PermissionUsers() {
  const { userId } = useParams();
  const { data, isLoading } = useGetUserInfoAndRolesQuery(userId);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="card shadow border-1 my-4 p-5 mx-5">
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
                <input hidden value={userId} />
                <div className="p-3">
                  <div className="form-floating py-2 col-12">
                    <input disabled className="form-control border-0 shadow" />
                    <label className="ms-2">Name</label>
                  </div>
                  <div className="form-floating py-2 col-12 mt-1">
                    <select className="form-select">
                      <option value="">Select a coupon code</option>
                    </select>
                  </div>
                  <div className="row pt-2">
                    <div className="col-6 col-md-3">
                      <button
                        type="submit"
                        className="btn btn-dark form-control"
                      >
                        Update Role
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      <button className="btn btn-outline-dark form-control">
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
