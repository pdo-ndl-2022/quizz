import { Transform } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("question")
export class QuestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @Column()
  // @Transform((param) => JSON.stringify(param.value))
  options: string;

  @Column()
  // @Transform((param) => JSON.stringify(param.value))
  answers: string;

  @Column()
  // @Transform((param) => param.value.join(","))
  docs: string;

  @Column()
  avg_score: number;

  @Column()
  nb_answers: number;
}
