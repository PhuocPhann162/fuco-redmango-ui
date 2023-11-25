import menuItemModel from "./menuItemModel";

export default interface cartItemModel {
  id?: number;
  menuItemId?: number;
  menuItems?: menuItemModel;
  quantity?: number;
}
