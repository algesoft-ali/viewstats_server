import mongoose from "mongoose";
import { IVideo } from "./video.interface";

export const VideoSchema = new mongoose.Schema<IVideo>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    uploadDate: { type: Date || String, required: true },
    totalViews: { type: Number, required: true },
    category: { type: String, required: true },
    type: {
      type: String,
      enum: {
        values: ["long", "shorts"],
        message: "Video type should be 'long' or 'shorts'",
      },
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "channels",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
