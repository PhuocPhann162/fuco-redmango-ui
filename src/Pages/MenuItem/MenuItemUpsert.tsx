import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { MainLoader } from "../../Components/Page/Common";
import { inputHelper, toastNotify } from "../../Helper";
import { SD_Categories } from "../../Utility/SD";

const Categories = [
  SD_Categories.APPETIZER,
  SD_Categories.BEVERAGES,
  SD_Categories.DESSERT,
  SD_Categories.ENTRÉE,
];

const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: Categories[0],
  price: "",
};

function MenuItemUpsert() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<any>("");
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleMenuItemInput = (
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
        setImageToStore("");
        toastNotify("File must be less than 1MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    if (imageToDisplay) {
      formData.append("File", imageToStore);
    }

    let response;

    if (!id) {
      // create
      response = await createMenuItem(formData);
      if (response) {
        setIsLoading(false);
        toastNotify("Menu Item created successfully");
        navigate("/menuItem/menuItemList");
      } else {
        toastNotify("An unexpected error occured", "error");
      }
    } else {
      // update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id: id });
      if (response) {
        toastNotify("Menu Item updated successfully", "success");
        navigate("/menuItem/menuItemList");
      } else {
        toastNotify("An unexpected error occured", "error");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      {!loading && (
        <>
          <h3 className="px-2 text-success">
            {!id ? "Add" : "Update"} Menu Item
          </h3>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="row mt-3">
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={menuItemInputs.name}
                  onChange={handleMenuItemInput}
                  required
                />
                <textarea
                  className="form-control mt-3"
                  placeholder="Enter Description"
                  name="description"
                  rows={10}
                  value={menuItemInputs.description}
                  onChange={handleMenuItemInput}
                ></textarea>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter Special Tag"
                  name="specialTag"
                  value={menuItemInputs.specialTag}
                  onChange={handleMenuItemInput}
                />
                <select
                  className="form-control mt-3 form-select"
                  placeholder="Enter Category"
                  name="category"
                  value={menuItemInputs.category}
                  onChange={handleMenuItemInput}
                >
                  {Categories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control mt-3"
                  required
                  placeholder="Enter Price"
                  name="price"
                  value={menuItemInputs.price}
                  onChange={handleMenuItemInput}
                />
                <input
                  type="file"
                  className="form-control mt-3"
                  onChange={handleFileChange}
                />
                <div className="row">
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-success form-control mt-5"
                    >
                      {!id ? "Add" : "Update"}
                    </button>
                  </div>
                  <div className="col-6">
                    <a
                      className="btn btn-secondary form-control mt-5"
                      onClick={() => navigate("/menuItem/menuItemList")}
                    >
                      Back to List
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-5 text-center">
                <img
                  src={imageToDisplay}
                  style={{ width: "100%", borderRadius: "30px" }}
                  alt="Upload Image"
                />
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default MenuItemUpsert;
