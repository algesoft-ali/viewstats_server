import * as mongoose from "mongoose";
import { IUser } from "./users.interface";

export const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    googleId: String,
    avatar: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
