import { MongoClient } from "mongodb";

let dbClient: MongoClient;

export async function initDbClient() {
  try {
    dbClient = await MongoClient.connect(process.env.DATABASE_URL || "");
    console.log("✔️   Connected to Database");
    return dbClient;
  } catch (error) {
    throw error;
  }
}

export async function getDbClient() {
  if (!dbClient) {
    await initDbClient();
  }
  return dbClient;
}
