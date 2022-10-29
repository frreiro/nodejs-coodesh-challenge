import { ProductModelInterface } from "../interfaces/ProductModelInterface.js";
import * as productRepository from "../repositories/products.repositorires.js"
import AppError from "../utils/appError.js";

export async function searchForProductAndInsertOrUpdate(product: ProductModelInterface){
	const dbProduct = await productRepository.findProductByCode(product.code);
	if(!dbProduct){
		await productRepository.insertProduct(product);
	} else {
		await productRepository.updateProduct(product);
	}
}

export async function findProductByCode(code: number){
	const product =  await productRepository.findProductByCode(code);
	if(!product) throw new AppError('Product not found', 404);
	return product
}