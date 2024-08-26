import express from "express";
import { productControllers } from "./product.controller";
const router = express.Router();
router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProducts);
router.get("/:productId", productControllers.getSingleProduct);
router.put("/:productId", productControllers.updateSingleProduct);
router.delete("/:productId", productControllers.deleteSingleProduct);
export const productRoutes = router;
