import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URL);

let db: Db = null;


let isConnect = false;

(async () => {
	try {
		await mongoClient.connect();
		db = mongoClient.db("coodesh_db");
		isConnect = true;
	} catch (e) {
		 isConnect = false;
		 throw new AppError("Could no connect to the database", 400)
		}
})()

export {db, isConnect, mongoClient};