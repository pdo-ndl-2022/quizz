import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QcmMapper } from "./adapters/mappers/qcm.mapper";
import { QuestionMapper } from "./adapters/mappers/question.mapper";
import { QcmEntity } from "./adapters/repositories/entities/qcm.entity";
import { QuestionEntity } from "./adapters/repositories/entities/question.entity";
import { PsqlQcmRepository } from "./adapters/repositories/psql-qcm.repository";
import { PsqlQuestionRepository } from "./adapters/repositories/psql-question.repository";
import { QcmController } from "./controllers/qcm.controller";
import { QuestionController } from "./controllers/question.controller";
import { QcmService } from "./services/qcm.service";
import { QuestionService } from "./services/question.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, QcmEntity])],
  controllers: [QuestionController, QcmController],
  providers: [
    PsqlQuestionRepository,
    QuestionService,
    QuestionMapper,
    PsqlQcmRepository,
    QcmService,
    QcmMapper
  ],
  exports: [QuestionService, QuestionMapper, QcmService, QcmMapper]
})
export class QuizModule {}
