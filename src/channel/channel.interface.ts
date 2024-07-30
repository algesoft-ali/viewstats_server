import { Model } from "mongoose";

export interface IChannel {
  name: string;
  username: string;
  logo?: string;
  country: string;
  category: string;
  description: string;
  createDate?: Date;
  totalViews?: number;
  totalSubscribers?: number;
  totalVideos?: number;
}

export type IChannelModel = Model<IChannel>;

export interface IChannelQueryParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  country?: string;
  category?: string
}
