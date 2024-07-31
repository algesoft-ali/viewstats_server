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

  // -------------- v1
  async findAll({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    populate,
    country,
    channel,
    ...queries
  }: IVideoQueryParams): Promise<{ data: IVideo[]; total: number }> {
    const andFilter = [];
    const orFilter = [];

    if (search) {
      orFilter.push({ title: { $regex: new RegExp(search, "i") } });
    }

    if (queries && Object.keys(queries).length) {
      const dbQueries = Object.entries(queries).map(([key, value]) => ({
        [key]: { $regex: new RegExp(value, "i") },
      }));
      andFilter.push(...dbQueries);
    }
    if (channel) {
      andFilter.push({ channel });
    }

    const filter = {
      $or: orFilter,
      $and: andFilter,
    };

    if (!filter.$or?.length) delete filter.$or;
    if (!filter.$and?.length) delete filter.$and;

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
      .populate(
        populate ? "channel" : "",
        populate ? "_id name username logo" : ""
      );

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
