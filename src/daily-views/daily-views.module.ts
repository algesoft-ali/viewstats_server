import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DailyViewsController } from "./daily-views.controller";
import { DailyViewsService } from "./daily-views.service";

@Module({
  imports: [DatabaseModule],
  controllers: [DailyViewsController],
  providers: [DailyViewsService],
})
export class DailyViewsModule {}
