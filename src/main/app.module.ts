import { DynamicModule, Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { OpenTelemetryModule } from "nestjs-otel";
import { AppService } from "./app.service";
import { HealthModule } from "./core/health/health.module";
import { TodoModule } from "./modules/todo/infrastructure/todo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configureTypeORM } from "./config/database.config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./modules/security/jwt.strategy";

interface AppModuleOptions {
  config?: Record<string, any>;
}

export class AppModule {
  static bootstrap(options?: AppModuleOptions): DynamicModule {
    return {
      module: AppModule,
      exports: [PassportModule],
      providers: [Logger, AppService, JwtStrategy],
      imports: [
        HealthModule,
        OpenTelemetryModule.forRoot(),
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => options?.config || {}]
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          imports: [ConfigModule],
          useFactory: configureTypeORM
        }),
        PassportModule.register({ defaultStrategy: "jwt" })
      ]
    };
  }
}
