import { Module } from "@nestjs/common";
import { DailyViewsController } from "./daily-views.controller";
import { DailyViewsService } from "./daily-views.service";
import { dailyViewsProviders } from "./daily-views.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [DailyViewsController],
  providers: [DailyViewsService, ...dailyViewsProviders],
})
export class DailyViewsModule {}
