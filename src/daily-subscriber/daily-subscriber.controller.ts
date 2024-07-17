import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateDailySubscriberDTO } from "./daily-subscriber.dto";
import { DailySubscriberService } from "./daily-subscriber.service";
import { Request } from "express";

@Controller("daily-subscriber")
export class DailySubscriberController {
  constructor(
    private readonly dailySubscriberService: DailySubscriberService
  ) {}

  // ----- insert new daily subscriber
  @Post()
  async createDailySubscriber(@Body() inputData: CreateDailySubscriberDTO) {
    try {
      const result = await this.dailySubscriberService.create(inputData);

      return {
        success: true,
        message: "Daily Subscriber Created Successfully",
        data: result,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // ----- Get Channel Daily Subscriber
  @Get(":channelId")
  async getChannelDailySubscriber(
    @Param() param: { channelId: string },
    @Req() req: Request
  ) {
    try {
      const startDate = req?.query?.startDate;
      const endDate = req?.query?.endDate;

      if (!startDate || !endDate) {
        throw new Error("startDate and endDate are required");
      }

      const input = {
        channelId: param?.channelId,
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
      };

      const { data, total } = await this.dailySubscriberService.findAll(input);

      return {
        success: true,
        message: "Channel Daily Subscriber Retrieved Successfully",
        meta: { total },
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
