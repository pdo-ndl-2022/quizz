import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qcm")
export class QcmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;
}
