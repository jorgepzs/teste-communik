import { AppDataSource } from "../dataBase/data-source";
import { Product } from "../dataBase/entities/Product";

export const productRepository = AppDataSource.getRepository(Product);
