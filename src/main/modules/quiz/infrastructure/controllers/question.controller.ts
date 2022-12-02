import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateQuestionDto } from "../../application/dto/create-question.dto";
import { QuestionParams } from "../adapters/params/question.param";
import { QuestionService } from "../services/question.service";

@Controller("questions")
@UseGuards(AuthGuard("jwt"))
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  find(@Query() query: QuestionParams) {
    return this.questionService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(id);
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Delete(":id")
  deleteOne(@Param("id") id: string) {
    return this.questionService.delete(id);
  }
}
