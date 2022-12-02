import { DynamicModule, Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { HealthModule } from "./core/health/health.module";
import { QuizModule } from "./modules/quiz/infrastructure/quiz.module";
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
        QuizModule,
        HealthModule,
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
