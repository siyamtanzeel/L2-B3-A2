import { ProductModel } from "../product/product.model";
import { productServices } from "../product/product.service";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//inserting order data into database
const createOrderIntoDB = async (order: TOrder) => {
  const { productId } = order;
  const product = await productServices.getSingleProductFromDB(productId);
  const newQuantityOfProduct =
    (product?.inventory.quantity as number) - order.quantity;
  if (product) {
    if (newQuantityOfProduct >= 0) {
      const result = await OrderModel.create(order);
      await ProductModel.updateOne(
        { _id: productId },
        {
          "inventory.quantity": newQuantityOfProduct,
          "inventory.inStock": newQuantityOfProduct > 0 ? true : false,
        }
      );
      return { data: result, message: "Order created successfully!" };
    } else {
      return {
        data: null,
        message: "Insufficient quantity available in inventory",
      };
    }
  } else {
    return { data: null, message: "ordered product not found" };
  }
};
//retriving order datas from database
const getAllOrdersfromDB = async (searchTerm: string) => {
  const searchQuery: any = {};
  if (searchTerm) {
    searchQuery.$or = [{ email: { $regex: searchTerm, $options: "i" } }];
  }
  const result = await OrderModel.find(searchQuery);
  return result;
};
export const orderServices = {
  createOrderIntoDB,
  getAllOrdersfromDB,
};
