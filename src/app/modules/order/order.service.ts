import { ProductModel } from "../product/product.model";
import { productServices } from "../product/product.service";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//inserting order data into database
const createOrderIntoDB = async (order: TOrder) => {
  const { productId } = order;
  //finding the specific ordered product
  const product = await productServices.getSingleProductFromDB(productId);
  //new quantity of the product after order
  const newQuantityOfProduct =
    (product?.inventory.quantity as number) - order.quantity;
  //checking the existence of the product
  if (product) {
    //checking the validity of the order based on available quantity of product
    if (newQuantityOfProduct >= 0) {
      //creating the order
      const result = await OrderModel.create(order);
      //updating the product after order
      await ProductModel.updateOne(
        { _id: productId },
        {
          "inventory.quantity": newQuantityOfProduct,
          "inventory.inStock": newQuantityOfProduct > 0 ? true : false, // inStock is true if the available quantity is greater than zero
        }
      );
      return { data: result, message: "Order created successfully!" };
    }
    //reject the order if available quantity is less than the ordered quantity
    else {
      return {
        data: null,
        message: "Insufficient quantity available in inventory",
      };
    }
  }
  //rejecting the order if the ordered product was not found
  else {
    return { data: null, message: "ordered product not found" };
  }
};
//retriving order datas from database
const getAllOrdersfromDB = async (searchTerm: string) => {
  const searchQuery: any = {};
  if (searchTerm) {
    //searching for an order with provided email address
    searchQuery.$or = [{ email: { $regex: searchTerm, $options: "i" } }];
  }
  const result = await OrderModel.find(searchQuery);
  return result;
};
export const orderServices = {
  createOrderIntoDB,
  getAllOrdersfromDB,
};
