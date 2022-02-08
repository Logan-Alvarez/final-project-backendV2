import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import IcebreakerRoute from "./routes/IcebreakerRoute";
import favIcebreakerRoute from "./routes/favoriteIcebreakers";
import favTriviaRoute from "./routes/favoriteTrivia";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", IcebreakerRoute);
app.use("/", favIcebreakerRoute);
app.use("/", favTriviaRoute);

export const api = functions.https.onRequest(app);
