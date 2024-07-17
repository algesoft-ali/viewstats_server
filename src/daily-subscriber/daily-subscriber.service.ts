import { Inject, Injectable } from "@nestjs/common";
import {
  IDailySubscriber,
  IDailySubscriberModel,
} from "./daily-subscriber.interface";

@Injectable()
export class DailySubscriberService {
  constructor(
    @Inject("DAILY_SUBSCRIBER_MODEL")
    private readonly dailySubscriberModel: IDailySubscriberModel
  ) {}

  async create(input: {
    channel: string;
    date?: Date;
    subscribers?: number;
  }): Promise<IDailySubscriber> {
    const date = new Date(input.date) || new Date();
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const dailySubscriber = await this.dailySubscriberModel.findOneAndUpdate(
      {
        channel: input.channel,
        date: { $gte: startOfDay, $lte: endOfDay },
      },
      {
        $inc: { subscribers: input.subscribers || 1 },
        $setOnInsert: { date: date, channel: input.channel },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return dailySubscriber;
  }

  async findAll(input: {
    channelId: string;
    startDate: string;
    endDate: string;
  }): Promise<{ data: IDailySubscriber[]; total: number }> {
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);
    const startOfDay = new Date(startDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(endDate.setHours(23, 59, 59, 999));

    const filter = {
      channel: String(input.channelId),
      date: { $gte: startOfDay, $lte: endOfDay },
    };

    const data = await this.dailySubscriberModel
      .find(filter, {
        createdAt: 0,
        updatedAt: 0,
      })
      .exec();

    const total = await this.dailySubscriberModel.countDocuments(filter);

    return { data, total };
  }
}
