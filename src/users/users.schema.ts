import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
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
