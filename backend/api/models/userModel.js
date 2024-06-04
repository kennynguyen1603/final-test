import mongoose from "mongoose";
import Collection from "../database/collection.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  refreshToken: { type: String, required: false },
});

const UserModel = mongoose.model(Collection.USERS, userSchema);
export default UserModel;
