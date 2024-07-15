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
  }: IChannelQueryParams): Promise<{ total: number; data: IChannel[] }> {
    const data = await this.channelModel.find(
      {},
      {},
      {
        sort: {
          [sortBy]: sortOrder,
        },
        skip: (page - 1) * limit,
        limit,
      }
    );

    const total = await this.channelModel.countDocuments();
    return { total, data };
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
