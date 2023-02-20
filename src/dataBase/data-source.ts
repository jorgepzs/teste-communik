import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
const port = process.env.DB_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
