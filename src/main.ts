import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import config from "src/config";
import "dotenv/config";
import { AppModule } from "./app/app.module";
import { AllExceptionsFilter } from "./error/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  // ----- Middlewares
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // ----- Error handlers
  // Bind the custom exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // ----- Start server
  await app.listen(config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
