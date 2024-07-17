import { Module } from "@nestjs/common";
import { DailySubscriberController } from "./daily-subscriber.controller";
import { DailySubscriberService } from "./daily-subscriber.service";
import { dailySubscriberProviders } from "./daily-subscriber.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [DailySubscriberController],
  providers: [DailySubscriberService, ...dailySubscriberProviders],
})
export class DailySubscriberModule {}
