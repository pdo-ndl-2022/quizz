import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionMapper } from "./adapters/mappers/question.mapper";
import { QuestionEntity } from "./adapters/repositories/entities/question.entity";
import { PsqlQuestionRepository } from "./adapters/repositories/psql-question.repository";
import { QuestionController } from "./controllers/question.controller";
import { QuestionService } from "./services/question.service";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [PsqlQuestionRepository, QuestionService, QuestionMapper],
  exports: [QuestionService, QuestionMapper]
})
export class QuizModule {}
