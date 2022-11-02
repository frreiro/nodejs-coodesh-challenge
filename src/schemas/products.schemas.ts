
import joi from "joi"
import { ProductModelInterface } from "../interfaces/ProductModelInterface.js"

export const updateProductSchema = joi.object<Omit<ProductModelInterface, "code" | "status" | "imported_t">>({
	url: joi.string(),
	creator: joi.string(),
	created_t: joi.number(),
	last_modified_t: joi.number(),
	product_name: joi.string(),
	quantity: joi.string(),
	brands: joi.string(),
	categories: joi.string(),
	labels: joi.string(),
	cities: joi.string(),
	purchase_places: joi.string(),
	stores: joi.string(),
	ingredients_text: joi.string(),
	traces: joi.string(),
	serving_size: joi.string(),
	serving_quantity: joi.number(),
	nutriscore_score: joi.number(),
	nutriscore_grade: joi.string(),
	main_category:joi.string(),
	image_url:joi.string()
}).required();