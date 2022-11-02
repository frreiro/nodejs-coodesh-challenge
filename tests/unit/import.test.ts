import { jest } from "@jest/globals";
import * as factory from "../factories/import.factory.js";
import { importServices } from "../../src/services/import.services.js";
import { productRepository } from "../../src/repositories/products.repositorires.js";

import fs from "fs"
import { faker } from "@faker-js/faker";


describe("Import test", () => {
	it("Given an zipped Buffer, should unzip buffer", async () => {
		const text = faker.word.verb()
		const bufferText = factory.createBufferFromInput(text)
		const bufferZippedText = factory.createZippedBuffer(bufferText);
		const unzippedBuffer = await importServices.unzipBuffer(bufferZippedText)
		expect(text).toEqual(unzippedBuffer.toString());
	})

	it("Given an json Buffer, should create file and write with json", async () => {
		const jsonArray = factory.createJsonWith100Lines()
		const bufferArr = jsonArray.map((json) => factory.createBufferFromInput(json))
		await importServices.createFileInSystem("test_file",bufferArr)
		expect(fs.existsSync('temp/test_file.txt')).toEqual(true);
	})

	it("Given a file, should readLine by line",async () => {
		jest.spyOn(productRepository, "findProductByCode").mockImplementation(async () => Promise.resolve(null));
		const FILE_NAME = "test_file"
		await factory.createFileAndFillWith100Products(FILE_NAME)
		const products = await importServices.readFileAndReturn100Objects(FILE_NAME)
		expect(products.length).toEqual(100);
	})

	it("Given a file, should delete it",async () => {
		const FILE_NAME = "test_file"
		await factory.createFileAndFillWith100Products(FILE_NAME)
		await importServices.deleteFile(FILE_NAME)
		expect(fs.existsSync('temp/test_file.txt')).toBe(false);
	})

	
});



afterAll(() => {
	if(fs.existsSync('temp/test_file.txt')){
		fs.promises.unlink(`temp/test_file.txt`)
	}
	jest.clearAllMocks();
})