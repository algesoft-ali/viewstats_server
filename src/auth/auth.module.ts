import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import config from "src/config";
import { DatabaseModule } from "src/database/database.module";
import { GoogleStrategy } from "src/strategies/google.strategy";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: config.jwt_secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}
