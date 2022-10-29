import {db} from "../config/db.js"
import {ProductModelInterface} from "../interfaces/ProductModelInterface.js"



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

