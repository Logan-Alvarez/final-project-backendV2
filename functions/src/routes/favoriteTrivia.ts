import express from "express";
import { getClient } from "../db";
import Data from "../models/Trivia";
import { ObjectId } from "mongodb";

const favTriviaRoute = express.Router();

//GET
favTriviaRoute.get("/favtrivia", async (req, res) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Data>("favoriteTrivia")
      .find()
      .toArray();
    res.json(result).status(200);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//POST
favTriviaRoute.post("/favtrivia", async (req, res) => {
  let newTrivia = req.body as Data;
  try {
    const client = await getClient();
    await client.db().collection<Data>("favoriteTrivia").insertOne(newTrivia);
    res.status(201);
    res.json(newTrivia);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete
favTriviaRoute.delete("/favtrivia/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Data>("favoriteTrivia")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default favTriviaRoute;
