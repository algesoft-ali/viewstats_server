import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
}

export type IUserModel = Model<IUser>;

export interface IUserResponse {
  user: Omit<IUser, "password">;
  accessToken: string;
}
