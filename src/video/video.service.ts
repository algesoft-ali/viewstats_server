import { Inject, Injectable } from "@nestjs/common";
import { IVideo, IVideoModel, IVideoQueryParams } from "./video.interface";

@Injectable()
export class VideoService {
  constructor(
    @Inject("VIDEO_MODEL") private readonly videoModel: IVideoModel
  ) {}

  async create(input: IVideo): Promise<IVideo> {
    const result = await this.videoModel.create(input);
    return result;
  }

  async findAll({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    channel,
  }: IVideoQueryParams): Promise<{ data: IVideo[]; total: number }> {
    const filter = search
      ? {
          $or: [{ title: { $regex: new RegExp(search, "i") } }],
        }
      : {};

    const data = await this.videoModel
      .find(
        filter,
        {},
        {
          sort: {
            [sortBy]: sortOrder,
          },
          skip: (page - 1) * limit,
          limit,
        }
      )
      .populate(channel ? "channel" : "", channel ? "_id name username logo" : "");

    const total = await this.videoModel.countDocuments(filter);

    return { data, total };
  }

  async findOne(id: string): Promise<IVideo> {
    const data = await this.videoModel.findById(
      id,
      {},
      { populate: "channel" }
    );

    return data;
  }
}
