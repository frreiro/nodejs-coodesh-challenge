import {db} from "../config/db.js"
import {ProductModelInterface, Status} from "../interfaces/ProductModelInterface.js"



async function findProductByCode(code: number) {
	return await db.collection('products').findOne({code});	
}

async function insertProduct(product: ProductModelInterface): Promise<void> {
	await db.collection('products').insertOne({...product});	
}

async function updateProduct(product: ProductModelInterface): Promise<void>{
	const {code, status, ... productUpdated} = product;
	await db.collection('products').updateOne(
		{code: product.code},
		{$set:{...productUpdated}} 
	);	
}

async function deleteProduct(code: number): Promise<void>{
	await db.collection('products').updateOne(
		{code: code},
		{$set:{status: "trash"}} 
	);	
}

async function findProductsPerPage(page: number, limit: number) {
	return await db.collection('products').find({ status: {$ne : "trash"}})
	.skip( (page - 1) * limit)
	.limit(limit)
	.toArray();	
}


async function updateProductByClient(code: number, modifications: ProductModelInterface): Promise<void>{
	await db.collection('products').updateOne(
		{code: code},
		{$set:{...modifications, status: "draft"}} 
	);	
}


export const productRepository = {
	findProductByCode,
	insertProduct,
	updateProduct,
	deleteProduct,
	findProductsPerPage,
	updateProductByClient
}
