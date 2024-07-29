import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";
import { DatabaseModule } from "src/database/database.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: config.jwt_secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
