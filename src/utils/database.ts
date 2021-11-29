import { MongoClient } from "mongodb";

let dbClient: MongoClient;
let eventDbClient: MongoClient;

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

export async function initEventDbClient() {
  try {
    eventDbClient = await MongoClient.connect(
      process.env.EVENT_DATABASE_URI || ""
    );
    console.log("✔️   Connected to Event Database");
    return eventDbClient;
  } catch (error) {
    throw error;
  }
}

export async function getEventDbClient() {
  if (!eventDbClient) {
    await initEventDbClient();
  }
  return eventDbClient;
}