import axios, { AxiosResponse } from "axios"
import {unzip} from "node:zlib"
import ndjson from "ndjson"
import fs from "fs"
import { v4 as uuid } from "uuid"

import ProductModelInterface from "../../interfaces/ProductModelInterface.js"
import { upsertImport } from "../../repositories/products.repositorires.js"

//TODO: Treat exceptions
export async function importFileNamesFromCoodesh(){
	console.time("request")
	console.log("Import running..")
	
	const filesNamesInText: AxiosResponse<string> = await axios.get(`${process.env.COODESH_URL}index.txt`)
	const filesNamesInArray = filesNamesInText.data.split("\n")
	const filesNames = filesNamesInArray.filter(fileName => fileName.endsWith(".gz"));

	//const arr = [];
	
	for(const zipFileName of filesNames){
		await importDataFromCoodesh(zipFileName);
		//arr.push(...productObject);
		
	}
	//console.log(arr.length)
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
		console.log("Arquivo criado");	
	} catch (err) {
		console.error('An error occurred creating file:', err);
	}
}

async function readFileAndReturn100Objects(fileName: string) : Promise<ProductModelInterface[]>{
	let contador = 0
	const hundredJSON: ProductModelInterface[] = []
	return new Promise((resolve, reject) => {
		fs.createReadStream(fileName)
		.pipe(ndjson.parse())
		.on("data", async (obj) => {
			contador ++
			if(contador <= 100) {
			const newObj = createProductObjectFromFile(obj);
			await upsertImport(newObj);
		}	
		})
		.on("error", (err) => console.error('An error occurred reading file:', err))
		.on("end", async () => {
			await deleteFile(fileName)
			resolve(hundredJSON)
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
		code: obj.code,
		status: "published",
		imported_t: new Date(),
		url: obj.url,
		creator: obj.creator,
		created_t: obj.created_t,
		last_modified_t:obj.last_modified_t,
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
		serving_quantity: obj.serving_quantity,
		nutriscore_score: obj.nutriscore_score,
		nutriscore_grade: obj.nutriscore_grade,
		main_category: obj.main_category,
		image_url: obj.image_url
	}
}
