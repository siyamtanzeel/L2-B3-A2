import { Request, Response } from "express";
import { productServices } from "./product.service";

//creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "product created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: "An error Occured",
      error: err,
    });
  }
};

//retriving all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: "An error Occured",
      error: err,
    });
  }
};

//retriving a single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      message: "An error Occured",
      error: err,
    });
  }
};
export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
