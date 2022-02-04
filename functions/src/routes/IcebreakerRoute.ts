import express from "express";
import IceBreaker from "../models/icebreaker";
import { getClient } from "../db";

const IcebreakerRoute = express.Router();

IcebreakerRoute.get("/icebreakers", async (req, res) => {
  const client = await getClient();
  let results = await client
    .db()
    .collection<IceBreaker>("icebreakers")
    .find()
    .toArray();
  res.json(results).status(200);
});

IcebreakerRoute.post("/icebreakers");

export default IcebreakerRoute;
