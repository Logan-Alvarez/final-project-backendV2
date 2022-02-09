import express from "express";
import { getClient } from "../db";
import IceBreaker from "../models/Icebreaker";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import IceBreaker from "../models/Icebreaker";

const favIcebreakerRoute = express.Router();

//GET
favIcebreakerRoute.get("/favicebreakers", async (req, res) => {
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
favIcebreakerRoute.post("/favicebreakers", async (req, res) => {
  const favIceBreaker = req.body as IceBreaker;
  delete favIceBreaker._id; //Delete the old _id then when added to the new array Mongodb assigns a new ObjectId? -YES IT WORKS
  try {
    const client = await getClient();
    await client
      .db()
      .collection<IceBreaker>("favoriteIcebreakers")
      .insertOne(favIceBreaker);
    res.status(201);
    res.json(favIceBreaker);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete
favIcebreakerRoute.delete("/favicebreakers/:id", async (req, res) => {
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
