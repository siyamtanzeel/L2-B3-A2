import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { orderServices } from "./order.service";

//retriving all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query?.email;
    const result = await orderServices.getAllOrdersfromDB(searchTerm as string);
    //response if specific orders were searched for
    if (searchTerm) {
      //response if specific orders were found
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      }
      //response if specific orders were not found
      else {
        res.status(500).json({
          success: true,
          message: "Order Not Found!",
          data: null,
        });
      }
    }
    //response if no search query was made
    else {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    //response if there was an error
    res.status(500).json({
      success: false,
      message: "Order not Found!",
      error: err,
    });
  }
};
//creating an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedData = orderValidationSchema.parse(order); //validating order data through zod
    const result = await orderServices.createOrderIntoDB(zodParsedData); //passing order data to service handler
    //response if order created successfully
    if (result.data) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result.data,
      });
    }
    //response if there was an error
    else {
      res.status(500).json({
        success: false,
        message: result.message,
      });
    }
  } catch (err) {
    //response if there was an error
    res.status(500).json({
      success: false,
      message: "Failed to make an order",
      error: err,
    });
  }
};
export const orderControllers = {
  getAllOrders,
  createOrder,
};
