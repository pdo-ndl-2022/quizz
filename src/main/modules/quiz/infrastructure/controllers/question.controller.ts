import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateQuestionDto } from "../../application/dto/create-question.dto";
import { QuestionService } from "../services/question.service";

@Controller("questions")
@UseGuards(AuthGuard("jwt"))
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  find() {
    return this.questionService.findAll();
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
