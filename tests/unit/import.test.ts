import { jest } from "@jest/globals";
import * as factory from "../factories/import.factory.js";
import * as importServices from "../../src/services/import.services.js"

import fs from "fs"
import { faker } from "@faker-js/faker";

beforeAll(() => {
})

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

	
});



afterAll(() => {
	fs.promises.unlink(`temp/test_file.txt`)
})