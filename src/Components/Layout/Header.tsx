import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../Storage/Redux/store";
import { cartItemModel, userModel } from "../../Interfaces";
import { useSelector, useDispatch } from "react-redux";
import { emptyUserState, setLoggedInUser } from "../../Storage/Redux/authSlice";
import { SD_Roles } from "../../Utility/SD";
let logo = require("../../Assets/Images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? null
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  const handleInformation = () => {
    navigate("/Information");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link px-2" aria-current="page" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px" }}
              className="m-1"
            />
          </NavLink>
          <NavLink
            className="nav-link text-white fs-4 px-1"
            aria-current="page"
            to="/"
            style={{ fontFamily: "cursive" }}
          >
            FucoMastery
          </NavLink>
          <div
            className="collapse navbar-collapse px-1"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 px-4">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <i className="bi bi-house-heart"></i> Home
                </NavLink>
              </li>
              {userData.role == SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <i className="bi bi-list-nested"></i> Admin Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      style={{
                        transitionDelay: `${1 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/myOrders")}
                    >
                      My Orders
                    </li>
                    <li
                      style={{
                        transitionDelay: `${2 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/allOrders")}
                    >
                      All Orders
                    </li>
                    <li
                      style={{
                        transitionDelay: `${3 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/menuItem/menuItemList")}
                    >
                      Menu Item
                    </li>
                    <li
                      style={{
                        transitionDelay: `${4 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/coupon/couponList")}
                    >
                      Coupon
                    </li>
                    <hr />
                    <li
                      style={{
                        transitionDelay: `${5 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/register")}
                    >
                      Register Users
                    </li>
                    <li
                      style={{
                        transitionDelay: `${6 * 0.1}s`,
                        cursor: "pointer",
                      }}
                      className="dropdown-item"
                      onClick={() => navigate("/user/manageUsers")}
                    >
                      Manager Users
                    </li>
                  </ul>
                </li>
              ) : userData.role === SD_Roles.EMPLOYEE ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Employee Panel
                  </a>
                  <ul className="dropdown-menu">
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/myOrders")}
                    >
                      My Orders
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/order/allOrders")}
                    >
                      All Orders
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/menuItem/menuItemList")}
                    >
                      Menu Item
                    </li>
                    <li
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => navigate("/coupon/couponList")}
                    >
                      Coupon
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/order/myOrders"
                  >
                    Orders
                  </NavLink>
                </li>
              )}

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart"></i>
                  {userData.id &&
                    `(${
                      shoppingCartFromStore?.length > 0
                        ? shoppingCartFromStore.length
                        : 0
                    })`}
                </NavLink>
              </li>
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                        onClick={handleInformation}
                      >
                        Welcome, {userData.fullName} !
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-warning btn-outlined rounded-pill  mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
