import { Request, Response } from "express";
import { orderValidationSchema } from "./order.validation";
import { orderServices } from "./order.service";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query?.email;
    const result = await orderServices.getAllOrdersfromDB(searchTerm as string);
    if (searchTerm) {
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      } else {
        res.status(500).json({
          success: true,
          message: "No orders found for user email!",
          data: null,
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders!",
      error: err,
    });
  }
};
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedData = orderValidationSchema.parse(order);
    const result = await orderServices.createOrderIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err) {
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
