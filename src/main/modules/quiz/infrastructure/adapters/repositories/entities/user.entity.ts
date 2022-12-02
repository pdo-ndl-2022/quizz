import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  given_name: string;

  @Column()
  picture: string;

  @Column()
  score: number;
}
