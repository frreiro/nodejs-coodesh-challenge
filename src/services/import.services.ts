import axios, { AxiosResponse } from "axios"
import {unzip} from "node:zlib"
import ndjson from "ndjson"
import fs from "fs"
import { v4 as uuid } from "uuid"

import {ProductModelInterface} from "../interfaces/ProductModelInterface.js"
import { searchForProductAndInsertOrUpdate } from "./products.services.js"
import  {productRepository} from "../repositories/products.repositorires.js"
import AppError from "../utils/appError.js"

async function importFileNamesFromCoodesh(){
	console.time("request")
	console.log("Import running..")
	
	const filesNamesInText: AxiosResponse<string> = await axios.get(`${process.env.COODESH_URL}index.txt`)
	const filesNamesInArray = filesNamesInText.data.split("\n")
	const filesNames = filesNamesInArray.filter(fileName => fileName.endsWith(".gz"));

	const allProductArray: ProductModelInterface[] = []
	for(const zipFileName of filesNames){
		const productArray = await importDataFromCoodesh(zipFileName);
		allProductArray.push(...productArray);
	}

	for(const product of allProductArray){
		await searchForProductAndInsertOrUpdate(product)
	}
	
	console.log("Done !")
	console.timeEnd("request")
}

 async function importDataFromCoodesh(zipFileName: string){
	const food = await axios.get(`${process.env.COODESH_URL}${zipFileName}`, {
		responseType: "arraybuffer"
	})
	const newFileRandomName = uuid().split("-")[0];
	const unzippedBuffer = await unzipBuffer(food.data);
	await createFileInSystem(newFileRandomName, unzippedBuffer);
	return await readFileAndReturn100Objects(newFileRandomName)
}
	
	
 async function unzipBuffer(buffer: Buffer): Promise<Buffer>{
	return new Promise((resolve, reject) => {
		unzip(buffer, async (err, unzippedBuffer) => {
			if (err) {
				throw new AppError("An error occurred while unzip file", 500);
			}
			resolve(unzippedBuffer);
		});
	})
}

 async function createFileInSystem(newFileName : string, buffer: Buffer | Buffer[]):Promise<void> {
	try {
		await fs.promises.writeFile(`temp/${newFileName}.txt`, buffer);
		console.log("file created");	
	} catch (err) {
		throw new AppError("An error occurred while creating file", 500);
	}
}

 async function readFileAndReturn100Objects(fileName: string) : Promise<ProductModelInterface[]>{
	return new Promise((resolve, reject) => {
		console.log("Reading file...")
		let contador = 0
		const productArray: ProductModelInterface[] = [];
		const editedProductArray: number[] = [];
		const readStream = fs.createReadStream(`temp/${fileName}.txt`)
		.pipe(ndjson.parse())
		.on("data", async (obj) => {
			
			const newObj = createProductObjectFromFile(obj);
			const dbProduct = await productRepository.findProductByCode(newObj.code);
			
			if(dbProduct && dbProduct.status === "draft"){
				editedProductArray.push(dbProduct.code)
			}
			
			productArray.push(newObj)
			contador ++
			if(contador >= 100) readStream.destroy(); 
		})
		.on("error", (err) => {
			throw new AppError("An error occurred while reading file", 500)
		})
		.on("end", async () => {
			await deleteFile(fileName)
			const filterList = removeEditedProduct(editedProductArray, productArray)
			resolve(filterList)
			
		})
		.on("close", async () => {
			await deleteFile(fileName)
			const filterList = removeEditedProduct(editedProductArray, productArray)
			resolve(filterList)
		})
	})
}

function removeEditedProduct(editedProducts: number[], products: ProductModelInterface[]){
	return products.filter(product => !editedProducts.includes(product.code))

}


 async function deleteFile(fileName: string){
	try {
		fs.promises.unlink(`temp/${fileName}.txt`)
		console.log("file deleted")
		
	} catch (err) {
		throw new AppError("An error occurred while deleting file", 500);
	}
}

function createProductObjectFromFile(obj): ProductModelInterface{
	return { 
		code: obj.code[0] === "\"" ? parseInt([...obj.code].slice(1).join("")) : parseInt(obj.code),
		status: "published",
		imported_t: new Date(),
		url: obj.url,
		creator: obj.creator,
		created_t: parseInt(obj.created_t),
		last_modified_t:parseInt(obj.last_modified_t),
		product_name: obj.product_name,
		quantity: obj.quantity,
		brands: obj.brands,
		categories: obj.categories,
		labels: obj.labels,
		cities: obj.cities,
		purchase_places: obj.purchase_places,
		stores: obj.stores,
		ingredients_text: obj.ingredients_text,
		traces: obj.traces,
		serving_size: obj.serving_size,
		serving_quantity: obj.serving_quantity == "" ? obj.serving_quantity : parseFloat(obj.serving_quantity),
		nutriscore_score: obj.nutriscore_score == "" ? obj.nutriscore_score : parseFloat(obj.nutriscore_score),
		nutriscore_grade: obj.nutriscore_grade,
		main_category: obj.main_category,
		image_url: obj.image_url
	}
}

export const importServices = {
	importDataFromCoodesh,
	unzipBuffer,
	createFileInSystem,
	readFileAndReturn100Objects,
	removeEditedProduct,
	deleteFile,
	importFileNamesFromCoodesh
}