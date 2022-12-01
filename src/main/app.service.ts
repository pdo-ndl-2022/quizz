import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown
} from "@nestjs/common";

@Injectable()
export class AppService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(AppService.name);

  onApplicationShutdown() {
    this.logger.log("Kafka client connection closed");
  }

  onApplicationBootstrap() {}
}
