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
      .find(
        filter,
        {
          createdAt: 0,
          updatedAt: 0,
        },
        {
          sort: { date: 1 },
        }
      )
      .exec();

    // Calculate increment/decrement rate
    const dataWithRate = data.map((current, index, array) => {
      if (index === 0) {
        return { ...current.toObject(), rate: 0 }; // No previous data to compare for the first item
      }

      const previous = array[index - 1];
      let rate: number = 0;

      if (previous.subscribers !== 0) {
        rate = +(
          ((current.subscribers - previous.subscribers) /
            previous.subscribers) *
          100
        ).toFixed(2);
      }

      return { ...current.toObject(), rate };
    });

    const total = await this.dailySubscriberModel.countDocuments(filter);

    return { data: dataWithRate, total };
  }
}
