import { Router } from "express";
import { orderControllers } from "./order.controller";
const router = Router();

router.get("/", orderControllers.getAllOrders);
router.post("/", orderControllers.createOrder);
export const orderRoutes = router;
