import {db} from "../config/db.js"
import {ProductModelInterface, Status} from "../interfaces/ProductModelInterface.js"



export async function findProductByCode(code: number) {
	return await db.collection('products').findOne({code});	
}

export async function insertProduct(product: ProductModelInterface): Promise<void> {
	await db.collection('products').insertOne({...product});	
}

export async function updateProduct(product: ProductModelInterface): Promise<void>{
	const {code, status, ... productUpdated} = product;
	await db.collection('products').updateOne(
		{code: product.code},
		{$set:{...productUpdated}} 
	);	
}

export async function deleteProduct(code: number): Promise<void>{
	await db.collection('products').updateOne(
		{code: code},
		{$set:{status: "trash"}} 
	);	
}

export async function findProductsPerPage(page: number, limit: number) {
	return await db.collection('products').find({ status: {$ne : "trash"}})
	.skip( (page - 1) * limit)
	.limit(limit)
	.toArray();	
}


//export async function updateProductStatus(code: number, status: Status): Promise<void>{
//	await db.collection('products').updateOne(
//		{code: code},
//		{$set:{status}} 
//	);	
//}

