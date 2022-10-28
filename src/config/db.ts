import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URL);

let db: Db = null;

try {
	await mongoClient.connect();
	db = mongoClient.db("challenge_db");
} catch (e) {
	console.error("Could no connect to the database")
}

export default db;