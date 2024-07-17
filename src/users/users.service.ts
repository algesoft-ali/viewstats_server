import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IUser } from "./users.interface";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_MODEL") private readonly userModel: Model<IUser>) {}

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }
}
