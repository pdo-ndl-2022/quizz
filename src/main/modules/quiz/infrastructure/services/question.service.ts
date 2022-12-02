import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from "../../application/dto/create-question.dto";
import { Question } from "../../domain/entities/question.entity";
import { QuestionParams } from "../adapters/params/question.param";
import { PsqlQuestionRepository } from "../adapters/repositories/psql-question.repository";

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: PsqlQuestionRepository) {}

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne(id);
    if (!question) throw new NotFoundException();
    return question;
  }

  async findAll(params: QuestionParams): Promise<Question[]> {
    return await this.questionRepository.findAll(params);
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = Question.create({
      ...createQuestionDto,
      nb_answers: 0,
      avg_score: 0,
      docs: createQuestionDto.docs || []
    });
    return await this.questionRepository.save(question);
  }

  async delete(id: string): Promise<void> {
    const question = await this.questionRepository.findOne(id);
    if (!question) throw new NotFoundException();
    return await this.questionRepository.remove(id);
  }
}
