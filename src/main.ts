import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import config from "src/config";
import "dotenv/config";
import { AppModule } from "./app/app.module";
import { AllExceptionsFilter } from "./error/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ----- Middlewares
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // ----- Error handlers
  // Bind the custom exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // ----- Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("ViewStats API")
    .setDescription(
      "This is dummy & testing project of integrating Nest JS backend API's. All of the API's are integrated with RTK Query and the state managed with Redux Toolkit. (Right Now Only 'MrBeast' Channel has daily views & daily subscribers data. Others channel doesn't have that data yet!)"
    )
    .setExternalDoc("Visit Here", "https://viewstats-xi.vercel.app/")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  // ----- Start server
  await app.listen(config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
