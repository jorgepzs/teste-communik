import { Client } from "../dataBase/entities/Client";
import { AppDataSource } from "../dataBase/data-source";
import { Manager } from "../dataBase/entities/Manager";

export const managerRepository = AppDataSource.getRepository(Manager);
