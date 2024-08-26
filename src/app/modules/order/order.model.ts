import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  email: {
    required: true,
    type: String,
  },
  productId: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  quantity: {
    required: true,
    type: Number,
  },
});
export const OrderModel = model<TOrder>("Order", orderSchema);
