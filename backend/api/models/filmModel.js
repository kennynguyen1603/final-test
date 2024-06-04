import mongoose from "mongoose";
import Collection from "../database/collection.js";

const filmSchema = new mongoose.Schema({
  ID: { type: Number, required: true },
  name: { type: String, required: true },
  time: { type: Number, required: true },
  year: { type: Number, required: true },
  image: { type: String, required: true },
  introduce: { type: String, required: true },
});

const FilmModel = mongoose.model(Collection.FILMS, filmSchema);
export default FilmModel;
