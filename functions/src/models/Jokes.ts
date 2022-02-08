import { ObjectId } from "mongodb";

export interface jokes {
    _id?: ObjectId;
    type: string;
    setup: string;
    punchline: string;
  }