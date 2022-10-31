import { Router } from "express";
import {  deleteProduct, findAllProducts, findProduct } from "../controllers/products.controllers.js";

const productRouter = Router();

//TODO: verificar o que pode ser atualizado com o PUT
productRouter.get('/products/:code', findProduct)
productRouter.get('/products', findAllProducts)
productRouter.delete('/products/:code', deleteProduct)
productRouter.put('/products/:code', )

export default productRouter