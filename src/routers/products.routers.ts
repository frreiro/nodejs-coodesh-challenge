import { Router } from "express";
import {  clientUpdateProduct, deleteProduct, findAllProducts, findProduct } from "../controllers/products.controllers.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import { updateProductSchema } from "../schemas/products.schemas.js";

const productRouter = Router();

productRouter.get('/products/:code', findProduct)
productRouter.get('/products', findAllProducts)
productRouter.delete('/products/:code', deleteProduct)
productRouter.put('/products/:code', schemaValidate(updateProductSchema), clientUpdateProduct )

export default productRouter