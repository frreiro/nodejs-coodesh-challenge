import { Router } from "express";
import { findProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

productRouter.get('/products/:code', findProduct)
productRouter.get('/products/', )
productRouter.put('/products/:code')
productRouter.delete('/products/:code')




export default productRouter