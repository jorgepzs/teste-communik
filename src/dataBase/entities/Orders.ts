import { Product } from "./Product";
import { Client } from "./Client";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

export enum OrderStatus {
  UNPAID = "unpaid",
  PAID = "paid",
}
@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  total_value: number;

  @ManyToOne(() => Client)
  @JoinColumn({ name: "client_id" })
  client_id: Client;

  @ManyToMany((type) => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @Column({ type: "text", default: "unpaid" })
  status: OrderStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
