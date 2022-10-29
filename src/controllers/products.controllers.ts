import { Request, Response } from "express"
import * as productServices from "../services/products.services.js"
import AppError from "../utils/appError.js";

export async function findProduct(req: Request, res: Response){
	const {code} = req.params;
	if(!Number(code)) throw new AppError("Param not allowed", 422);
	const product = await productServices.findProductByCode(parseInt(code))
	res.send(product);
}


export async function deleteProduct(req: Request, res: Response){
	const {code} = req.params;
	if(!Number(code)) throw new AppError("Param type not allowed", 422);
	await productServices.findProductAndDelete(parseInt(code))
	res.sendStatus(200);
}

//export async function changeProductStatus(req: Request, res: Response){
//	const {code} = req.params;
//	if(!Number(code)) throw new AppError("Param type not allowed", 422);
//	//await productServices.findProductAndDelete(parseInt(code))
//	res.sendStatus(200);
//}


export async function findAllProducts(req: Request, res: Response){
	let {page} = req.query;
	if(!page) page = '1'
	if(!Number(page) || Number(page) <= 0) throw new AppError("query-string not allowed", 422);
	const products = await productServices.find50Products(Number(page))
	res.send(products);
}
