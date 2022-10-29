import { Router } from "express";
import { findProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

productRouter.get('/products/:code', findProduct)

export default productRouter