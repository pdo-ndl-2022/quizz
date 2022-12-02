import { IsOptional } from "class-validator";

export class QuestionParams {
  @IsOptional()
  category?: string;
}
