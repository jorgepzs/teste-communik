import { AppDataSource } from '../dataBase/data-source';
import { Order } from './../dataBase/entities/Orders';



export const orderRepository = AppDataSource.getRepository(Order);
