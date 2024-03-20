import React, { useEffect, useState } from "react";
import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import { menuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { toast } from "react-toastify";
import { Modal } from "../../Components/Layout";

let decoration = require("../../Assets/Images/decoration_1.png");

function MenuItemList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemsQuery("");
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  const [showContent, setShowContent] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  let cnt = 1;

  useEffect(() => {
    if (!isLoading) {
      setShowContent(true);
    }
  }, [isLoading]);

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
    setIsModalShow(false);
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {showContent && (
        <div className="table p-5 fade-in">
          <div className="d-flex align-items-center justify-content-between">
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
                <h1 className="text-success">MenuItem List</h1>
              </div>
            </div>
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
            <div style={{ fontWeight: 700 }} className="row border">
              <div className="col-1">Image</div>
              <div className="col-1"></div>
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
                <div className="col-1"></div>
                <div className="col-1">{cnt++}</div>
                <div className="col-2">{menuItem.name}</div>
                <div className="col-2">{menuItem.category}</div>
                <div className="col-1">{menuItem.price}</div>
                <div className="col-2">{menuItem.specialTag}</div>
                <div className="col-1">
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/menuItem/menuItemUpsert/" + menuItem.id)
                    }
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => setIsModalShow(true)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                  <Modal
                    title=" Are you sure?"
                    content="Do you really want to delete this menu item? This process cannot be undone."
                    isShow={isModalShow}
                    onClose={() => setIsModalShow(false)}
                    onConfirm={() => handleDeleteMenuItem(menuItem.id!)}
                  />
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
