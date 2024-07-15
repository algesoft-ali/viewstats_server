import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import "dotenv/config";
import config from "config";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./error/all-exceptions.filter";
import { NotFoundExceptionFilter } from "./error/not-found-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  // ----- Middlewares
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // ----- Error handlers
  // Bind the custom exception filter globally
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new NotFoundExceptionFilter()
  );

  // ----- Start server
  await app.listen(config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
