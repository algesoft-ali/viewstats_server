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
    ...queries
  }: IVideoQueryParams): Promise<{ data: IVideo[]; total: number }> {
    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: new RegExp(search, "i") } },
            {
              username: { $regex: new RegExp(search, "i") },
            },
          ],
        }
      : undefined;

    const andFilter =
      queries && Object.keys(queries).length
        ? {
            $and: Object.entries(queries).map(([key, value]) => ({
              [key]: { $regex: new RegExp(value, "i") },
            })),
          }
        : undefined;

    const filter = {
      ...searchFilter,
      ...andFilter,
    };

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
