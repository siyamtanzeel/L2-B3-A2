import { Request, Response } from "express";
import { productServices } from "./product.service";
import productValidationSchema from "./product.validation";

//creating a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = productValidationSchema.parse(productData); // validating data through zod
    const result = await productServices.createProductIntoDB(zodParsedData); //inserting valid data into DB
    // response after succesfully inserting data
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    // response if any error found
    res.status(500).json({
      success: false,
      message: "Failed to create product!",
      error: err,
    });
  }
};

//retriving all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query?.searchTerm;
    const result = await productServices.getAllProductsFromDB(
      searchTerm as string
    ); // fetching products from DB

    //response if specific products were searched for
    if (searchTerm) {
      //response if searched products were found
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      }
      //response if searched products were not found
      else {
        res.status(500).json({
          success: false,
          message: `No Products matching search term '${searchTerm}' was found`,
          data: result,
        });
      }
    }
    //response if no search query was made
    //returns all products
    else {
      res.status(200).json({
        success: true,
        message: `Products fetched successfully!`,
        data: result,
      });
    }
  } catch (err) {
    // response if failed to fetch
    res.status(500).json({
      success: false,
      message: "Could not fetch products",
      error: err,
    });
  }
};

//retriving a single product using ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getSingleProductFromDB(id);
    if (result) {
      //When product is found
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    } else {
      //When no product is found
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
//updating a specific product by ID
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product); // validating the product by zod
    const result = await productServices.updateSingleProductInDB(
      id,
      zodParsedData
    );
    // response if product updated
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    // response if failed to update
    res.status(500).json({
      success: false,
      message: "Could not update the product",
      error: err,
    });
  }
};
//deleting a specific product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.deleteSingleProductFromDB(id);
    // response if product deleted
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      // response if failed to delete
      res.status(500).json({
        success: false,
        message: "Could not delete the product",
      });
    }
  } catch (err) {
    // response if failed to delete
    res.status(500).json({
      success: false,
      message: "Could not delete the product",
      error: err,
    });
  }
};
export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
