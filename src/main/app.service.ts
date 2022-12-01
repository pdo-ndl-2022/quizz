import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown
} from "@nestjs/common";

@Injectable()
export class AppService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  onApplicationShutdown() {}

  onApplicationBootstrap() {}
}
