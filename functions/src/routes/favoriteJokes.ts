import express from "express";
import { getClient } from "../db";
import { jokes } from "../models/Jokes";
import { ObjectId } from "mongodb";

const favoriteJoke = express.Router();

favoriteJoke.get("/favjokes", async (req, res) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<jokes>("favoriteJokes")
      .find()
      .toArray();
    res.json(result).status(200);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

favoriteJoke.post("/favjokes", async (req, res) => {
  let newJoke = req.body as jokes;
  delete newJoke._id;
  try {
    const client = await getClient();
    await client.db().collection<jokes>("favoriteJokes").insertOne(newJoke);
    res.status(201);
    res.json(newJoke);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete
favoriteJoke.delete("/favjokes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<jokes>("favoriteJokes")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default favoriteJoke;
