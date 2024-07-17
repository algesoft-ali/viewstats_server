import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";
import { LoggerMiddleware } from "src/middleware/logger.middleware";
import { ChannelModule } from "src/channel/channel.module";
import { DailySubscriberModule } from "src/daily-subscriber/daily-subscriber.module";

@Module({
  imports: [AuthModule, UsersModule, ChannelModule, DailySubscriberModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
