import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("managers")
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text" })
  password: string;
}
