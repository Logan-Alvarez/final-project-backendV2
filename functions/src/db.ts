import { MongoClient } from "mongodb";
import * as functions from "firebase-functions";

const uri = functions.config().mongodb.uri; //Data base connection. Reference to .runtimeconfig.json
let client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
  await client.connect();
  return client;
};
