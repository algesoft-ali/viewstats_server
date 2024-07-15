import { Module } from "@nestjs/common";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";
import { channelProviders } from "./channel.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ChannelController],
  providers: [ChannelService, ...channelProviders],
})
export class ChannelModule {}
