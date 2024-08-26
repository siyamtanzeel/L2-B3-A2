import express, { Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRoutes } from "./app/modules/order/order.route";
const app = express();
export const port = 3000;

//parsers
app.use(cors());
app.use(express.json());

//application routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
export default app;
