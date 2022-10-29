import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URL);

let db: Db = null;


let isConnect = false;

//TODO: Send error to user when not connect
try {
	await mongoClient.connect();
	db = mongoClient.db("coodesh_db");
	isConnect = true;
} catch (e) {
	 isConnect = false;
	console.error("Could no connect to the database")
}

export {db, isConnect};