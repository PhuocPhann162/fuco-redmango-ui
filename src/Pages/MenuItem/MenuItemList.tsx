import React from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { menuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { AlertDialog, MainLoader } from "../../Components/Page/Common";
import { toast } from "react-toastify";

function MenuItemList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemsQuery("");
  const [deleteMenuItem] = useDeleteMenuItemMutation();

  const handleDeleteMenuItem = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "An unexpected error occured 🤯",
      },
      {
        theme: "dark",
      }
    );
  };
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">MenuItem List</h1>
            <button
              className="btn btn-success"
              onClick={() => {
                navigate("/menuItem/menuItemUpsert");
              }}
            >
              Add New Menu Item
            </button>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col-1">Action</div>
            </div>
            {data.result.map((menuItem: menuItemModel) => (
              <div className="row border" key={menuItem.id}>
                <div className="col-1">
                  <img
                    src={menuItem.image}
                    alt="no content"
                    style={{ width: "100%", maxWidth: "120px" }}
                  />
                </div>
                <div className="col-1">{menuItem.id}</div>
                <div className="col-2">{menuItem.name}</div>
                <div className="col-2">{menuItem.category}</div>
                <div className="col-1">{menuItem.price}</div>
                <div className="col-2">{menuItem.specialTag}</div>
                <div className="col-1">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate("/menuItem/menuItemUpsert/" + menuItem.id)
                    }
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDeleteMenuItem(menuItem.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
