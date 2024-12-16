import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockStore from "../mockStore";
import { MenuItemList } from "../../Pages";
import { menuItemApi } from "../../Apis";

const mockMenuItems = {
  result: [
    {
      id: 1,
      name: "Grilled Salmon",
      description:
        "A delicious grilled salmon fillet served with a lemon butter sauce.",
      specialTag: "Chef's Special",
      category: "Main Course",
      price: 19.99,
      image: "https://example.com/images/grilled-salmon.jpg",
    },
    {
      id: 2,
      name: "Caesar Salad",
      description:
        "Fresh romaine lettuce, parmesan cheese, and croutons with Caesar dressing.",
      specialTag: "Healthy Choice",
      category: "Appetizer",
      price: 8.99,
      image: "https://example.com/images/caesar-salad.jpg",
    },
    {
      id: 3,
      name: "Spaghetti Carbonara",
      description:
        "Classic Italian pasta with a creamy sauce, pancetta, and Parmesan.",
      specialTag: "Customer Favorite",
      category: "Main Course",
      price: 14.99,
      image: "https://example.com/images/spaghetti-carbonara.jpg",
    },
    {
      id: 4,
      name: "Chocolate Lava Cake",
      description:
        "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
      specialTag: "Dessert",
      category: "Dessert",
      price: 6.99,
      image: "https://example.com/images/chocolate-lava-cake.jpg",
    },
    {
      id: 5,
      name: "Iced Coffee",
      description: "Refreshing iced coffee made with freshly brewed espresso.",
      specialTag: "",
      category: "Beverage",
      price: 3.49,
      image: "https://example.com/images/iced-coffee.jpg",
    },
  ],
};

jest.mock("../../Apis/menuItemApi", () => ({
  ...jest.requireActual("../../Apis/menuItemApi"),
  useGetMenuItemsQuery: jest.fn(),
  useDeleteMenuItemMutation: jest.fn(),
}));

test("renders MenuItem List with fetched data", async () => {
  // Giả lập phản hồi từ useGetCouponsQuery
  (menuItemApi.useGetMenuItemsQuery as jest.Mock).mockReturnValue({
    data: mockMenuItems,
    isLoading: false,
  });

  (menuItemApi.useDeleteMenuItemMutation as jest.Mock).mockReturnValue([
    jest.fn().mockResolvedValue({}),
  ]);

  render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <MenuItemList />
      </BrowserRouter>
    </Provider>
  );

  // Kiểm tra tiêu đề được render
  expect(await screen.findByText(/MenuItem List/i)).toBeInTheDocument();

  // Kiểm tra dữ liệu từ API được render đúng
  await waitFor(() => {
    expect(screen.getByText("Grilled Salmon")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Caesar Salad")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText("Spaghetti Carbonara")).toBeInTheDocument();
  });

  // Kiểm tra các thông tin khác
  expect(screen.getByText("$19.99")).toBeInTheDocument();
  expect(screen.getByText("$8.99")).toBeInTheDocument();
  expect(screen.getByText("$14.99")).toBeInTheDocument();
});
