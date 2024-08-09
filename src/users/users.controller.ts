import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/middleware/auth.guard";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("User")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers() {
    const data = await this.userService.findAll();
    return {
      success: true,
      message: "Users Retrieved Successfully!",
      data,
    };
  }

  // ----- get single user
  @Get("me")
  @UseGuards(AuthGuard)
  async getSingleUser(@Req() req: Request) {
    const userId = req["user"]["id"];

    const data = await this.userService.findOne(userId);
    return {
      success: true,
      message: "User Retrieved Successfully!",
      data,
    };
  }
}
