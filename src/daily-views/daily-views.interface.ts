import { Model } from "mongoose";
import { IChannel } from "src/channel/channel.interface";

export interface IDailyViews {
  date: Date;
  views: number;
  channel: string | IChannel;
  video: string;
}

export type IDailyViewsModel = Model<IDailyViews>;
