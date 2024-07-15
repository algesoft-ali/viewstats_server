import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { GoogleStrategy } from "src/strategies/google.strategy";
import { usersProviders } from "src/users/users.providers";
import { DatabaseModule } from "src/database/database.module";
import config from "config";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret:config.jwt_secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, ...usersProviders],
})
export class AuthModule {}
