import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { IDatabase } from "../types/index.js";

const file = "./db/data.json";
const adapter = new JSONFile<IDatabase>(file);

// Provide default data when creating Low instance
const defaultData: IDatabase = { employees: [] };
const db = new Low<IDatabase>(adapter, defaultData);

// Read data from JSON file
await db.read();

export default db;
