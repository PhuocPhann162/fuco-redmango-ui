import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper } from "../../Helper";

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
  image: "",
};

function MenuItemUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemByIdQuery(id);
  console.log(data);
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const hadnleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  return (
    <>
        <div className="container border mt-5 p-5">
          <h3 className="offset-2 px-2 text-success">
            {!id ? "Add" : "Update"} Product
          </h3>
          <form method="post" encType="multipart/form-data">
            <div className="row mt-3">
              <div className="col-md-5 offset-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={menuItemInputs.name}
                  onChange={hadnleMenuItemInput}
                  required
                />
                <textarea
                  className="form-control mt-3"
                  placeholder="Enter Description"
                  name="description"
                  rows={10}
                  value={menuItemInputs.description}
                  onChange={hadnleMenuItemInput}
                ></textarea>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Special Tag"
                  name="specialTag"
                  value={menuItemInputs.specialTag}
                  onChange={hadnleMenuItemInput}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Category"
                  name="category"
                  value={menuItemInputs.category}
                  onChange={hadnleMenuItemInput}
                />
                <input
                  type="number"
                  className="form-control mt-3"
                  required
                  placeholder="Enter Price"
                  name="price"
                  value={menuItemInputs.price}
                  onChange={hadnleMenuItemInput}
                />
                <input type="file" className="form-control mt-3" />
                <div className="d-flex">
                  <button
                    type="submit"
                    style={{ width: "50%" }}
                    className="btn btn-success mt-5"
                  >
                    {id ? "Update" : "Add"}
                  </button>{" "}
                  &nbsp;
                  <button
                    className="btn btn-secondary mt-5"
                    style={{ width: "50%" }}
                    onClick={() => navigate(-1)}
                  >
                    Back to List
                  </button>
                </div>
              </div>
              {id && (
                <div className="col-md-5 text-center">
                  <img
                    src=""
                    style={{ width: "100%", borderRadius: "30px" }}
                    alt="MenuItem Image"
                  />
                </div>
              )}
            </div>
          </form>
        </div>
    </>
  );
}

export default MenuItemUpsert;
