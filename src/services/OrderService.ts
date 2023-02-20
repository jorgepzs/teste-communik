import { productRepository } from "./../repositories/productRepository";
import { Order, OrderStatus } from "./../dataBase/entities/Orders";
import { orderRepository } from "./../repositories/orderRepository";
import { Product, productStatus } from "./../dataBase/entities/Product";
import { Client } from "../dataBase/entities/Client";
import { UpdateResult } from "typeorm";

export interface PayloadOrderCreate {
  clientId: Client;
  products: Array<Product>;
}

export interface PayloadPaidOrder {
  orderId: number;
}

export class OrderService {
  async registerOrder({ clientId, products }: PayloadOrderCreate) {
    try {
      if (!clientId || !products) {
        return new Error("fill all fields to create order");
      }
      const totalValue = products.reduce(
        (totalValue, value) => totalValue + value.price,
        0
      );

      const newOrder = orderRepository.create({
        client_id: clientId,
        products: products,
        total_value: totalValue,
      });

      if (!newOrder) {
        return new Error("Order Registration Failed");
      }

      const saveOrder = await orderRepository.save(newOrder);
      if (!saveOrder) {
        return new Error("Order Registration Failed");
      }
      return newOrder;
    } catch (error) {
      return console.log(error, "Order Registration Failed");
    }
  }
  async PaidOrder({ orderId }: PayloadPaidOrder) {
    try {
      if (!orderId) {
        return new Error("Invalid Paylaod");
      }
      const verifyOrder = await orderRepository.findOneBy({
        id: orderId,
      });
      if (!verifyOrder) {
        return new Error("Order Not found");
      }
      const products = verifyOrder.products;
      const updateStatusProduct = products.map((product) =>
        productRepository.update(product.id, { status: productStatus.SOLD })
      );

      await Promise.all(updateStatusProduct);

      if (!updateStatusProduct) return new Error("internal Server Error");
      console.log(updateStatusProduct);

      const updateOrderStatus = await orderRepository.update(orderId, {
        status: OrderStatus.PAID,
      });

      if (!updateOrderStatus) {
        return new Error("internal server error");
      }

      return updateOrderStatus;
    } catch (error) {
      return new Error(error);
    }
  }
}
