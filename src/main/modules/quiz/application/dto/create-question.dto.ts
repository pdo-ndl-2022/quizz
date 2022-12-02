import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[];

  @IsNotEmpty()
  @IsArray()
  @Type(() => Number)
  answers: number[];

  @IsOptional()
  @IsArray()
  docs?: string[];
}

class Option {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsInt()
  @IsNotEmpty()
  id: number;
}
