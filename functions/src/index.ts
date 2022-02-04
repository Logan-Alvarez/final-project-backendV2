import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import IcebreakerRoute from "./routes/IcebreakerRoute";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", IcebreakerRoute);

export const api = functions.https.onRequest(app);
