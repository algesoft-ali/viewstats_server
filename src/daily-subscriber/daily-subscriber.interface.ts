import { Model } from "mongoose";
import { IChannel } from "src/channel/channel.interface";

export interface IDailySubscriber {
  date: Date;
  subscribers: number;
  channel: string | IChannel;
}

export type IDailySubscriberModel = Model<IDailySubscriber>;
