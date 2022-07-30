import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = "testing";

const testDB = process.env.MONGO_URL_TEST;

process.env.MONGO_URL = testDB;