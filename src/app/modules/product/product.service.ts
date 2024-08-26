import { Product, TProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import productValidationSchema from "./product.validation";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};
const updateSingleProductInDB = async (id: string, product: TProduct) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, product);
  return result;
};
export const productServices = {
  createProductIntoDB,
  getAllStudentsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
};
