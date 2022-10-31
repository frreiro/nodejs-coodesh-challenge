import {faker} from "@faker-js/faker"
import {gzipSync} from "node:zlib"

export function createJsonWith100Lines() {
	const productArray = [];
	for(let i = 0 ; i< 100; i++){
		productArray.push(createProductObj()+"\r\n")
	}
	return productArray;
}

export function createBufferFromInput(input: any){
	return Buffer.from(input);
}

export function createZippedBuffer(jsonBuffer: Buffer){
	return gzipSync(jsonBuffer);
}


function createProductObj() {
	const randomPastDate = faker.date.past().getTime() 
	const product = { 
		code: faker.random.numeric(3),
		status: "published",
		imported_t: new Date(),
		url: faker.internet.url(),
		creator: faker.random.word(),
		created_t: randomPastDate,
		last_modified_t: faker.date.between(randomPastDate, new Date().getTime()),
		product_name: faker.lorem.words(2),
		quantity: faker.lorem.words(5),
		brands: faker.lorem.words(2),
		categories: faker.lorem.words(5),
		labels: faker.lorem.words(5),
		cities: faker.address.cityName(),
		purchase_places: faker.address.cityName() + faker.address.country(),
		stores: faker.lorem.words(1),
		ingredients_text: faker.lorem.words(5),
		traces: faker.lorem.words(5),
		serving_size: faker.lorem.words(2),
		serving_quantity: faker.datatype.float({max: 100}),
		nutriscore_score: faker.datatype.number(),
		nutriscore_grade: faker.random.words(1),
		main_category: faker.random.words(),
		image_url: faker.internet.url()
	}
	return JSON.stringify(product)
}
