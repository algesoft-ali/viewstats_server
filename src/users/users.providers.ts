import { Connection, Model } from "mongoose";
import { UserSchema } from "./users.schema";
import { IUser } from "./users.interface";

export const usersProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection) =>
      connection.model<IUser, Model<IUser>>("users", UserSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
