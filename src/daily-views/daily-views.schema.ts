import mongoose from "mongoose";
import { IDailyViews } from "./daily-views.interface";

export const DailyViewsSchema = new mongoose.Schema<IDailyViews>(
  {
    date: { type: Date, required: true },
    views: { type: Number, required: true },
    channel: { type: String, required: true },
    video: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
