import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  IChannel,
  IChannelModel,
  IChannelQueryParams,
} from "./channel.interface";

@Injectable()
export class ChannelService {
  constructor(
    @Inject("CHANNEL_MODEL") private readonly channelModel: IChannelModel
  ) {}

  async findAll({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
  }: IChannelQueryParams): Promise<{ total: number; data: IChannel[] }> {
    const filter = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search, "i") } },
            {
              username: { $regex: new RegExp(search, "i") },
            },
          ],
        }
      : {};

    const data = await this.channelModel.find(
      filter,
      {
        description: 0,
      },
      {
        sort: {
          [sortBy]: sortOrder,
        },
        skip: (page - 1) * limit,
        limit,
      }
    );

    const total = await this.channelModel.countDocuments(filter);
    return { total, data };
  }

  async findOne(id: string): Promise<IChannel> {
    const channel = await this.channelModel.findById(id);

    return channel;
  }

  async findByUsername(username: string): Promise<IChannel> {
    return await this.channelModel.findOne({ username });
  }

  async findPopularChannels(): Promise<IChannel[]> {
    const result = await this.channelModel.aggregate([
      { $sort: { totalViews: -1 } },
      { $limit: 20 },
      { $project: { description: 0 } },
      { $sample: { size: 6 } },
    ]);

    return result;
  }

  async createChannel(input: IChannel): Promise<IChannel> {
    const existingChannel = await this.channelModel.findOne({
      username: input.username,
    });

    if (existingChannel) {
      throw new HttpException(
        "Channel already exists with this username",
        HttpStatus.CONFLICT
      );
    }

    const newChannel = await this.channelModel.create(input);

    return newChannel;
  }
}
