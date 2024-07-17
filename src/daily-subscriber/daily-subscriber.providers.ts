import { Connection } from "mongoose";
import { DailySubscriberSchema } from "./daily-subscriber.schema";
import {
  IDailySubscriber,
  IDailySubscriberModel,
} from "./daily-subscriber.interface";

export const dailySubscriberProviders = [
  {
    provide: "DAILY_SUBSCRIBER_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IDailySubscriber, IDailySubscriberModel>(
        "dailySubscribers",
        DailySubscriberSchema
      ),
    inject: ["DATABASE_CONNECTION"],
  },
];
