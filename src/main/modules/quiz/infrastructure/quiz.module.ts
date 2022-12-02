import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QcmMapper } from "./adapters/mappers/qcm.mapper";
import { QuestionMapper } from "./adapters/mappers/question.mapper";
import { UserMapper } from "./adapters/mappers/user.mapper";
import { QcmEntity } from "./adapters/repositories/entities/qcm.entity";
import { QuestionEntity } from "./adapters/repositories/entities/question.entity";
import { UserEntity } from "./adapters/repositories/entities/user.entity";
import { PsqlQcmRepository } from "./adapters/repositories/psql-qcm.repository";
import { PsqlQuestionRepository } from "./adapters/repositories/psql-question.repository";
import { PsqlUserRepository } from "./adapters/repositories/psql-user.repository";
import { QcmController } from "./controllers/qcm.controller";
import { QuestionController } from "./controllers/question.controller";
import { UserController } from "./controllers/user.controller";
import { QcmService } from "./services/qcm.service";
import { QuestionService } from "./services/question.service";
import { UserService } from "./services/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, QcmEntity, UserEntity])],
  controllers: [QuestionController, QcmController, UserController],
  providers: [
    PsqlQuestionRepository,
    QuestionService,
    QuestionMapper,
    PsqlQcmRepository,
    QcmService,
    QcmMapper,
    PsqlUserRepository,
    UserService,
    UserMapper
  ],
  exports: [
    QuestionService,
    QuestionMapper,
    QcmService,
    QcmMapper,
    UserService,
    UserMapper
  ]
})
export class QuizModule {}
