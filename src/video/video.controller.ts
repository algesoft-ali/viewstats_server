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
import { VideoService } from "./video.service";
import { CreateVideoDTO } from "./video.dto";
import { Request } from "express";

@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // ------- Create Video
  @Post()
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
  async findAll(@Req() req: Request) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const sortBy = req.query.sortBy ? String(req.query.sortBy) : "createdAt";
      const sortOrder = req.query.sortOrder
        ? (String(req.query.sortOrder) as "asc" | "desc")
        : "desc";
      const search = req.query.search ? String(req.query.search) : "";

      const { data, total } = await this.videoService.findAll({
        page,
        limit,
        sortBy,
        sortOrder,
        search,
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
      throw new HttpException(error.message, error.status);
    }
  }

  // ------ Get Single Video
  @Get(":id")
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
