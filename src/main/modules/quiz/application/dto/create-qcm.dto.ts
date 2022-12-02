import { IsNotEmpty, IsString } from "class-validator";

export class CreateQcmDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
