import express from "express";
import { getClient } from "../db";
import IceBreaker from "../models/icebreaker";
import { ObjectId } from "mongodb";

const favIcebreakerRoute = express.Router();

//GET
favIcebreakerRoute.get("/favorites", async (req, res) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<IceBreaker>("favoriteIcebreakers")
      .find()
      .toArray();
    res.json(result).status(200);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//POST
favIcebreakerRoute.post("/favorites", async (req, res) => {
  let newIceBreaker = req.body as IceBreaker;
  try {
    const client = await getClient();
    await client
      .db()
      .collection<IceBreaker>("favoriteIcebreakers")
      .insertOne(newIceBreaker);
    res.status(201);
    res.json(newIceBreaker);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete
favIcebreakerRoute.delete("/favorites/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<IceBreaker>("favoriteIcebreakers")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default favIcebreakerRoute;
