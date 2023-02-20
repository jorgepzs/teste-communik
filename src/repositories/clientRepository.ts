import { Client } from "../dataBase/entities/Client";
import { AppDataSource } from "../dataBase/data-source";

export const clientRepository = AppDataSource.getRepository(Client)