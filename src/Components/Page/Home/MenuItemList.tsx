import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";
import { setSearchItems } from "../../../Storage/Redux/menuItemSlice";

function MenuItemList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [categoryList, setCategoryList] = useState([""]);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];
  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchItems(e.target.value));
    setValue(e.target.value);
  };

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);

      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });

      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleFilters = (
    sortType: SD_SortTypes,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItemModel) =>
              item.category.toUpperCase() === category.toUpperCase()
          );

    // search functionality
    if (search) {
      const tempSearchMenuItems = [...tempArray];
      tempArray = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    // sort functionality
    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
  };

  const handleFilterCategories = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);

        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setMenuItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul
          className="nav w-100 d-flex justify-content-center"
          data-testid="category-list"
        >
          <div className="d-flex align-items-center col-xl-3">
            <input
              type={"text"}
              className="form-control rounded-pill"
              style={{
                width: "100%",
                padding: "20px 20px",
              }}
              placeholder="Search for Food Items!"
              value={value}
              onChange={handleChange}
            />
            <span style={{ position: "relative", left: "-43px" }}>
              <i className="bi bi-search"></i>
            </span>
          </div>
          {categoryList.map((categoryName: string, index: number) => (
            <li
              data-testid="category-filter-li"
              className="nav-item"
              style={{ ...(index === 0 && { marginLeft: "auto" }) }}
              key={index}
            >
              <button
                data-testid="category-filter-btn"
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleFilterCategories(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 rounded mt-1"
              style={{ border: "1px solid #25C19F" }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul
              className="dropdown-menu"
              style={{ transition: "all 0.3s ease" }}
            >
              {sortOptions.map((sortType, index) => (
                <li
                  data-testid="sort-price-name-li"
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                  style={{
                    transitionDelay: `${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard key={index} menuItem={menuItem} />
        ))}
    </div>
  );
}

export default MenuItemList;
