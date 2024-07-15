import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";
import { LoggerMiddleware } from "src/middleware/logger.middleware";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
