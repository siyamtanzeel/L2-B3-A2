import { Request, Response } from "express";
import { productServices } from "./product.service";
import { z } from "zod";
import productValidationSchema from "./product.validation";

//creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData); // validating data through zod
    const result = await productServices.createProductIntoDB(zodParsedData); //inserting valid data into DB
    res.status(200).json({
      success: true,
      message: "product created successfully",
      data: result,
    }); // response after succesfully inserting data
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to create product",
      error: err,
    }); // response if any error found
  }
};

//retriving all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllStudentsFromDB(); // fetching all products from DB
    res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: result,
    }); //response if products fetched
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    }); // response if failed to fetch
  }
};

//retriving a single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getSingleProductFromDB(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product Fetched Successfully",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Product Not Found",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Product Not Found",
      error: err,
    });
  }
};
export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
};
