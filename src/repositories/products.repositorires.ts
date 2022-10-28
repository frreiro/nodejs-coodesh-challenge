import db from "../config/db.js"
import ProductModelInterface from "../interfaces/ProductModelInterface.js"

export async function upsertImport(product: ProductModelInterface): Promise<void>{
	await db.collection('products').insertOne(product)
		
}