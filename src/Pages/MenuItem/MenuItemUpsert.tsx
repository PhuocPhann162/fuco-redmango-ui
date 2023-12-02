import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery } from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper, toastNotify } from "../../Helper";

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
  const [imageToBeStore, setImageToBeStore] = useState<any>();
  const [imageToBeDisplay, setImageToBeDisplay] = useState<any>("");
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const hadnleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log(file);
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToBeStore("");
        toastNotify("File must be less than 1MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStore("");
        toastNotify("File must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToBeDisplay(imgUrl);
      };
    }
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
              <input
                type="file"
                className="form-control mt-3"
                onChange={handleFileChange}
              />
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
            <div className="col-md-5 text-center">
              <img
                src={imageToBeDisplay}
                style={{ width: "100%", borderRadius: "30px" }}
                alt="Product Image"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MenuItemUpsert;
