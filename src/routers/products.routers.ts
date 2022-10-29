import { Router } from "express";
import {  deleteProduct, findAllProducts, findProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

productRouter.get('/products/:code', findProduct)
productRouter.get('/products', findAllProducts)
productRouter.put('/products/:code', )
productRouter.delete('/products/:code', deleteProduct)

export default productRouter