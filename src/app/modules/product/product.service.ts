import { Product, TProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import productValidationSchema from "./product.validation";

//adding a product to database
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};
//retriving all products from database
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
//retriving a single product from database by ID
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};
// updating a product into Database
const updateSingleProductInDB = async (id: string, product: TProduct) => {
  const result = await ProductModel.findOneAndUpdate({ _id: id }, product);
  return result;
};
//deleting a specific product from database
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};
export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductInDB,
  deleteSingleProductFromDB,
};
