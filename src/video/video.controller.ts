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
import { CreateVideoDTO } from "./video.dto";
import { VideoService } from "./video.service";

@Controller("video")
@ApiTags("Video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // ------- Create Video
  @Post()
  @ApiBody({ type: CreateVideoDTO })
  async create(@Body() input: CreateVideoDTO) {
    try {
      const data = await this.videoService.create(input);

      return {
        success: true,
        message: "Video Created Successfully!",
        data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // ------- Get All Video
  @Get()
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiQuery({ name: "sortBy", required: false })
  @ApiQuery({ name: "sortOrder", required: false })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "populate", type: Boolean, required: false })
  @ApiQuery({ name: "country", required: false })
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "type", required: false })
  @ApiQuery({ name: "channel", required: false })
  async findAll(@Req() req: Request) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const sortBy = req.query.sortBy ? String(req.query.sortBy) : "createdAt";
      const sortOrder = req.query.sortOrder
        ? (String(req.query.sortOrder) as "asc" | "desc")
        : "desc";
      const search = req.query.search ? String(req.query.search) : "";
      const populate = req.query.populate === "true";
      const country = req.query.country ? String(req.query.country) : "";
      const category = req.query.category ? String(req.query.category) : "";
      const type = req.query.type ? String(req.query.type) : "";
      const channel = req.query.channel ? String(req.query.channel) : "";
      const { data, total } = await this.videoService.findAll({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
        populate,
        country,
        category,
        type,
        channel,
      });

      return {
        success: true,
        message: "All Video retrieved successfully!",
        meta: {
          currentPage: page,
          limit,
          total,
        },
        data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  // ------ Get Recent Video
  @Get("recent")
  @ApiQuery({ name: "channel" })
  async findRecent(@Req() req: Request) {
    try {
      const channelId = req.query.channel ? String(req.query.channel) : "";
      const data = await this.videoService.findRecent(channelId);

      return {
        success: true,
        message: data
          ? "Recent Video Retrieved Successfully!"
          : "No Video Found!",
        data,
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.statusCode);
    }
  }

  // ------ Get Single Video
  @Get(":id")
  @ApiParam({ name: "id" })
  async findOne(@Param() params: { id: string }) {
    try {
      const id = params?.id;
      const data = await this.videoService.findOne(id);

      if (!data) {
        throw new HttpException("Video Not found", HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        message: "Video retrieved successfully!",
        data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
