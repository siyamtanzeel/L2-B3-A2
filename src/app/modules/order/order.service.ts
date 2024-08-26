import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

//inserting order data into database
const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
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
