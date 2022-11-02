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
	if(product.status === "trash") throw new AppError('Product was deleted', 404);
	return product
}

export async function findProductAndDelete(code: number){
	const product =  await productRepository.findProductByCode(code);
	if(!product) throw new AppError('Product not found', 404);
	if(product.status === "trash") throw new AppError('Product already was deleted', 404);
	await productRepository.deleteProduct(code);
}


export async function find50Products(page: number){
	const LIMIT = 50;
	const product = await productRepository.findProductsPerPage(page, LIMIT);
	return product
}


export async function clientChangeProduct(code: number, modifications: ProductModelInterface){
	const product =  await productRepository.findProductByCode(code);
	if(!product) throw new AppError('Product not found', 404);
	await productRepository.updateProductByClient(code, modifications);
}