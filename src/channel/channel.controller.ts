import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { CreateChannelDTO } from "./channel.dto";
import { ChannelService } from "./channel.service";
import { Request } from "express";

@Controller("channel")
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  // ------ Create Channel
  @Post()
  async create(@Body() inputData: CreateChannelDTO) {
    try {
      const data = await this.channelService.createChannel(inputData);
      return {
        success: true,
        message: "Channel Created Successfully",
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // ------ Get All Channels
  @Get()
  async findAll(@Req() req: Request) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : "createdAt";
    const sortOrder = req.query.sortOrder
      ? (String(req.query.sortOrder) as "asc" | "desc")
      : "desc";
    const search = req.query.search ? String(req.query.search) : "";

    const { data, total } = await this.channelService.findAll({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
    });
    return {
      success: true,
      message: "Channels Retrieved Successfully",
      meta: {
        currentPage: page,
        limit,
        total,
      },
      data,
    };
  }

  // ------ Get Popular Channels
  @Get("popular")
  async findPopularChannels() {
    const data = await this.channelService.findPopularChannels();
    return {
      success: true,
      message: "Popular Channels Retrieved Successfully",
      data,
    };
  }

  // ------ Get Single Channel
  @Get(":id")
  async findOne(@Param() param: { id: string }) {
    try {
      const id = param.id;
      const data = await this.channelService.findOne(id);
      return {
        success: true,
        message: "Channel Retrieved Successfully",
        data,
      };
    } catch (error) {
      throw new HttpException("Channel Not Found", HttpStatus.NOT_FOUND);
    }
  }
}
