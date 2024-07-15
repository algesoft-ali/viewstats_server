import mongoose from "mongoose";
import { IChannel } from "./channel.interface";

export const ChannelSchema = new mongoose.Schema<IChannel>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    logo: { type: String },
    category: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    createDate: { type: Date },
    totalViews: { type: Number },
    totalSubscribers: { type: Number },
    totalVideos: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
