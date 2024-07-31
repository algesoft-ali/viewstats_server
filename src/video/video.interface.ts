import { Model } from "mongoose";
import { IChannel } from "src/channel/channel.interface";

export interface IVideo {
  title: string;
  thumbnail: string;
  duration: string;
  uploadDate: Date | string;
  totalViews: number;
  type: "long" | "shorts";
  category: string;
  channel: string | IChannel;
}

export type IVideoModel = Model<IVideo>;

export interface IVideoQueryParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  populate?: boolean;
  country?: string;
  category?: string;
  type?: string;
}

