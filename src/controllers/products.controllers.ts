import { Request, Response } from "express"
import * as productServices from "../services/products.services.js"

export async function findProduct(req: Request, res: Response){
	const {code} = req.params;
	const product = await productServices.findProductByCode(parseInt(code))
	res.send(product);
}