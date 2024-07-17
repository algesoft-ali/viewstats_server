import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { DatabaseModule } from "src/database/database.module";
import { usersProviders } from "./users.providers";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: config.jwt_secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
