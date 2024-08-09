import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { DailyViewsService } from "./daily-views.service";
import { CreateDailyViewsDTO } from "./daily-views.dto";
import { Request } from "express";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";

@Controller("daily-views")
@ApiTags("Daily Views")
export class DailyViewsController {
  constructor(private readonly dailyViewsService: DailyViewsService) {}

  // ----- create daily views
  @Post()
  @ApiBody({ type: CreateDailyViewsDTO })
  async createDailyViews(@Body() inputData: CreateDailyViewsDTO) {
    try {
      const data = await this.dailyViewsService.create(inputData);

      return {
        success: true,
        message: "Daily Views Created Successfully",
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  // ----- get daily views
  @Get()
  @ApiQuery({ name: "channel" })
  @ApiQuery({ name: "video", required: false })
  @ApiQuery({ name: "startDate", example: "2024-07-01" })
  @ApiQuery({ name: "endDate", example: "2024-07-30" })
  async getDailyViews(@Req() req: Request) {
    try {
      const channel = req.query.channel ? String(req.query.channel) : "";
      const startDate = req.query.startDate ? String(req.query.startDate) : "";
      const endDate = req.query.endDate ? String(req.query.endDate) : "";
      const video = req.query.video ? String(req.query.video) : "";

      if (!startDate || !endDate || !channel) {
        throw new Error("startDate, endDate and channel are required");
      }

      const input = {
        startDate,
        endDate,
        channel,
        video,
      };

      const { data, total } = await this.dailyViewsService.findAll(input);

      return {
        success: true,
        message: "Daily Views Retrieved Successfully",
        meta: { total },
        data,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
