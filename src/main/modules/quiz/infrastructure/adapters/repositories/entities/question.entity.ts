import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("question")
export class QuestionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;

  @Column()
  category: string;

  @Column()
  options: string;

  @Column()
  answers: string;

  @Column()
  docs: string;

  @Column()
  avg_score: number;

  @Column()
  nb_answers: number;
}
