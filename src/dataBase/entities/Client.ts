import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  username: string;

  @Column({ type: "text" })
  password: string;


}
