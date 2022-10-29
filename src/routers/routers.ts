import { Router } from "express";
import apiRouter from "./api.routers.js";
import productRouter from "./products.routers.js";

const router = Router();

router.use(apiRouter);
router.use(productRouter)

export default router;