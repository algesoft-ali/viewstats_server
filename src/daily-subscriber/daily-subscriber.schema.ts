import mongoose from "mongoose";
import { IDailySubscriber } from "./daily-subscriber.interface";

export const DailySubscriberSchema = new mongoose.Schema<IDailySubscriber>(
  {
    date: { type: Date, required: true },
    subscribers: { type: Number, required: true },
    channel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
