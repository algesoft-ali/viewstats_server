import { Inject, Injectable } from "@nestjs/common";
import { IDailyViews, IDailyViewsModel } from "./daily-views.interface";

@Injectable()
export class DailyViewsService {
  constructor(
    @Inject("DAILY_VIEWS_MODEL")
    private readonly dailyViewsModel: IDailyViewsModel
  ) {}

  async create(input: {
    date: string;
    views: number;
    channel: string;
    video?: string;
  }) {
    const startOfDay = new Date(new Date(input.date).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(input.date).setHours(23, 59, 59, 999));

    const result = await this.dailyViewsModel.findOneAndUpdate(
      {
        channel: input.channel,
        video: input.video,
        date: { $gte: startOfDay, $lte: endOfDay },
      },
      {
        $setOnInsert: {
          date: input.date,
          channel: input.channel,
        },
        $inc: { views: input.views || 1 },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return result;
  }

  async findAll(input: {
    startDate: string;
    endDate: string;
    channel?: string;
    video?: string;
  }): Promise<{ data: IDailyViews[]; total: number }> {
    const startOfDay = new Date(new Date(input.startDate).setHours(0, 0, 0, 0));
    const endOfDay = new Date(
      new Date(input.endDate).setHours(23, 59, 59, 999)
    );
    const filter = {
      date: { $gte: startOfDay, $lte: endOfDay },
      channel: input.channel,
      ...(input.video && { video: input.video }),
    };

    const data = await this.dailyViewsModel.find(
      filter,
      {
        createdAt: 0,
        updatedAt: 0,
      },
      {
        sort: { date: 1 },
      }
    );

    // Calculate increment/decrement rate
    const dataWithRate = data.map((current, index, array) => {
      if (index === 0) {
        return { ...current.toObject(), rate: 0 }; // No previous data to compare for the first item
      }

      const previous = array[index - 1];
      let rate: number = 0;

      if (previous.views !== 0) {
        rate = +(
          ((current.views - previous.views) / previous.views) *
          100
        ).toFixed(2);
      }

      return { ...current.toObject(), rate };
    });

    const total = await this.dailyViewsModel.countDocuments(filter);
    return { data: dataWithRate, total };
  }
}
