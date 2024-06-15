import express, { Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
const app = express();
export const port = 3000;

//parsers
app.use(cors());
app.use(express.json());

//application routes
app.use("/api/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
export default app;
