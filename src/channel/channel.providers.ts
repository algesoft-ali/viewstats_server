import { Connection } from "mongoose";
import { IChannel, IChannelModel } from "./channel.interface";
import { ChannelSchema } from "./channel.schema";

export const channelProviders = [
  {
    provide: "CHANNEL_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IChannel, IChannelModel>("channels", ChannelSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
