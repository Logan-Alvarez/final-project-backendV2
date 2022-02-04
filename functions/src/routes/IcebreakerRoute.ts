import express from "express";
import IceBreaker from "../models/icebreaker";
import { getClient } from "../db";
import { ObjectId } from "mongodb";

const IcebreakerRoute = express.Router();

//GET
IcebreakerRoute.get("/icebreakers", async (req, res) => {
  const client = await getClient();
  const result = await client
    .db()
    .collection<IceBreaker>("icebreakers")
    .find()
    .toArray();
  res.json(result).status(200);
});

//GET BY ID
IcebreakerRoute.get("/icebreakers/:id", async (req, res) => {
  const id = req.params.id;
  const client = await getClient();
  const result = await client
    .db()
    .collection<IceBreaker>("icebreakers")
    .findOne({ _id: new ObjectId(id) });
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

//POST
IcebreakerRoute.post("/icebreakers", async (req, res) => {
  let newIceBreaker = req.body as IceBreaker;
  const client = await getClient();
  await client
    .db()
    .collection<IceBreaker>("icebreakers")
    .insertOne(newIceBreaker);
  res.status(201);
  res.json(newIceBreaker);
});

//PUT
IcebreakerRoute.put("/Icebreakers/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as IceBreaker;
  delete data._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<IceBreaker>("icebreakers")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else data._id = new ObjectId(id);
    res.json(data);
  } catch {}
});

//Delete
IcebreakerRoute.delete("/icebreakers/:id", async (req, res) => {
  const id = req.params.id;
  const client = await getClient();
  const result = await client
    .db()
    .collection<IceBreaker>("icebreakers")
    .deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) {
    res.status(404).json({ message: "Not Found" });
  } else res.status(204).end();
});
export default IcebreakerRoute;
