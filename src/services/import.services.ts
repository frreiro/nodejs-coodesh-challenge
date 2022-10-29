import axios, { AxiosResponse } from "axios"
import {unzip} from "node:zlib"
import ndjson from "ndjson"
import fs from "fs"
import { v4 as uuid } from "uuid"

import {ProductModelInterface} from "../interfaces/ProductModelInterface.js"
import { searchForProductAndInsertOrUpdate } from "./products.services.js"

//TODO: Treat exceptions
export async function importFileNamesFromCoodesh(){
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

export async function importDataFromCoodesh(zipFileName: string){
	const food = await axios.get(`${process.env.COODESH_URL}${zipFileName}`, {
		responseType: "arraybuffer"
	})
	const newFileRandomName = uuid().split("-")[0];
	const unzippedBuffer = await unzipBuffer(food.data);
	await createFileInSystem(`temp/${newFileRandomName}.txt`, unzippedBuffer);
	return await readFileAndReturn100Objects(`temp/${newFileRandomName}.txt`)
}
	
	
async function unzipBuffer(buffer: Buffer): Promise<Buffer>{
	return new Promise((resolve, reject) => {
		unzip(buffer, async (err, unzippedBuffer) => {
			if (err) {
				console.error('An error occurred:', err);
			}
			resolve(unzippedBuffer);
		});
	})
}

async function createFileInSystem(newFileName : string, buffer: Buffer):Promise<void> {
	try {
		await fs.promises.writeFile(newFileName, buffer);
		console.log("file created");	
	} catch (err) {
		console.error('An error occurred creating file:', err);
	}
}

async function readFileAndReturn100Objects(fileName: string) : Promise<ProductModelInterface[]>{
	return new Promise((resolve, reject) => {
		let contador = 0
		const productArray: ProductModelInterface[] = [];
		const readStream = fs.createReadStream(fileName)
		.pipe(ndjson.parse())
		.on("data", async (obj) => {
			if(contador >= 100) readStream.destroy(); 
			else {
				const newObj = createProductObjectFromFile(obj);
				productArray.push(newObj)
			}
			contador ++
		})
		.on("error", (err) => console.error('An error occurred reading file:', err))
		.on("end", async () => {
			await deleteFile(fileName)
			console.log(productArray.length)
			resolve(productArray)

		})
		.on("close", async () => {
			await deleteFile(fileName)
			console.log(productArray.length)
			resolve(productArray)
		})
	})
}


async function deleteFile(fileName: string){
	try {
		fs.promises.unlink(fileName)
		console.log("file deleted")
		
	} catch (err) {
		console.error('An error occurred deleting file:', err);
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
