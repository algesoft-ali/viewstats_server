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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CreateChannelDTO } from "./channel.dto";
import { ChannelService } from "./channel.service";

@Controller("channel")
@ApiTags("Channel")
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  // ------ Create Channel
  @Post()
  @ApiBody({ type: CreateChannelDTO })
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
  @ApiQuery({ name: "page", type: Number, required: false })
  @ApiQuery({ name: "limit", type: Number, required: false })
  @ApiQuery({ name: "sortBy", type: String, required: false })
  @ApiQuery({ name: "sortOrder", type: String, required: false })
  @ApiQuery({ name: "search", type: String, required: false })
  @ApiQuery({ name: "country", type: String, required: false })
  @ApiQuery({ name: "category", type: String, required: false })
  async findAll(@Req() req: Request) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const sortBy = req.query.sortBy ? String(req.query.sortBy) : "createdAt";
    const sortOrder = req.query.sortOrder
      ? (String(req.query.sortOrder) as "asc" | "desc")
      : "desc";
    const search = req.query.search ? String(req.query.search) : "";
    const country = req?.query.country ? String(req.query.country) : "";
    const category = req?.query.category ? String(req.query.category) : "";

    const { data, total } = await this.channelService.findAll({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      country,
      category,
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
  @Get(":username")
  @ApiParam({ name: "username", type: String, required: true })
  async findOne(@Param() param: { username: string }) {
    try {
      const username = param.username;
      const data = await this.channelService.findByUsername(username);
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
