import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { loadConfiguration } from "./config/loader.config";
import { logger } from "./config/logger.config";

async function bootstrap() {
  const config = loadConfiguration(logger);

  const app = await NestFactory.create(AppModule.bootstrap({ config }), {
    logger
  });

  await app.startAllMicroservices();

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  const port = config["server"]["port"] || 3000;

  await app.listen(port, () => {
    logger.log(`Server listening on port ${port}`, "NestApplication");
  });
}

bootstrap();
