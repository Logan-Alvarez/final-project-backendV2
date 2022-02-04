import { ObjectId } from "mongodb";

export default interface IceBreaker {
  _id?: ObjectId;
  category: string;
  question: string;
}
