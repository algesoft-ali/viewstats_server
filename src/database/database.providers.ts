import config from "src/config";
import * as mongoose from "mongoose";
import { Connection } from "mongoose";

// channel
import { IChannel, IChannelModel } from "src/channel/channel.interface";
import { ChannelSchema } from "src/channel/channel.schema";

// daily views
import {
  IDailyViews,
  IDailyViewsModel,
} from "src/daily-views/daily-views.interface";
import { DailyViewsSchema } from "src/daily-views/daily-views.schema";

// daily subscribers
import {
  IDailySubscriber,
  IDailySubscriberModel,
} from "src/daily-subscriber/daily-subscriber.interface";
import { DailySubscriberSchema } from "src/daily-subscriber/daily-subscriber.schema";

// user
import { IUser, IUserModel } from "src/users/users.interface";
import { UserSchema } from "src/users/users.schema";

// video
import { IVideo, IVideoModel } from "src/video/video.interface";
import { VideoSchema } from "src/video/video.schema";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.database_url),
  },
  {
    provide: "CHANNEL_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IChannel, IChannelModel>("channels", ChannelSchema),
    inject: ["DATABASE_CONNECTION"],
  },
  {
    provide: "DAILY_VIEWS_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IDailyViews, IDailyViewsModel>(
        "dailyViews",
        DailyViewsSchema
      ),
    inject: ["DATABASE_CONNECTION"],
  },
  {
    provide: "DAILY_SUBSCRIBER_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IDailySubscriber, IDailySubscriberModel>(
        "dailySubscribers",
        DailySubscriberSchema
      ),
    inject: ["DATABASE_CONNECTION"],
  },
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IUser, IUserModel>("users", UserSchema),
    inject: ["DATABASE_CONNECTION"],
  },
  {
    provide: "VIDEO_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IVideo, IVideoModel>("videos", VideoSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
