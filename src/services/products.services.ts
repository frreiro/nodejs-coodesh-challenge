import { ProductModelInterface } from "../interfaces/ProductModelInterface.js";
import * as productRepository from "../repositories/products.repositorires.js"

export async function searchForProductAndInsertOrUpdate(product: ProductModelInterface){
	const dbProduct = await productRepository.findProductByCode(product.code);
	if(!dbProduct){
		await productRepository.insertProduct(product);
	} else {
		await productRepository.updateProduct(product);
	}
}