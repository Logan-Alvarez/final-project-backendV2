import express from "express";
import IceBreaker from "../models/Icebreaker";
import { getClient } from "../db";
import { ObjectId } from "mongodb";

const IcebreakerRoute = express.Router();

//GET
IcebreakerRoute.get("/icebreakers", async (req, res) => {
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<IceBreaker>("icebreakers")
      .find()
      .toArray();
    res.json(result).status(200);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET BY ID
IcebreakerRoute.get("/icebreakers/:id", async (req, res) => {
  const id = req.params.id;
  try {
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
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//POST
IcebreakerRoute.post("/icebreakers", async (req, res) => {
  let newIceBreaker = req.body as IceBreaker;
  try {
    const client = await getClient();
    await client
      .db()
      .collection<IceBreaker>("icebreakers")
      .insertOne(newIceBreaker);
    res.status(201);
    res.json(newIceBreaker);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//PUT
IcebreakerRoute.put("/icebreakers/:id", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Delete
IcebreakerRoute.delete("/icebreakers/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<IceBreaker>("icebreakers")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default IcebreakerRoute;
