import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum productStatus {
  UNSOLD = "unsold",
  SOLD = "sold",
}
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "integer" })
  price: number;

  @Column({ type: "text", default: "unsold" })
  status: productStatus;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
