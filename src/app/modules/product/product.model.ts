import { Schema, model } from "mongoose";
import { Inventory, Product, Variants } from "./product.interface";

const variantsSchema = new Schema<Variants>({
  type: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
});

const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  tags: { type: [String], required: true },
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<Product>("Product", productSchema);
