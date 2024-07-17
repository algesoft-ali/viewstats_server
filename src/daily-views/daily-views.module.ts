import { Module } from '@nestjs/common';
import { DailyViewsController } from './daily-views.controller';
import { DailyViewsService } from './daily-views.service';

@Module({
  controllers: [DailyViewsController],
  providers: [DailyViewsService]
})
export class DailyViewsModule {}
