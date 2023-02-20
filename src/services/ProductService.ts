import { productStatus } from "../dataBase/entities/Product";
import { OrderStatus } from "./../dataBase/entities/Orders";
import { productRepository } from "./../repositories/productRepository";
export interface PayloadProduct {
  name: string;
  price: number;
  description: string;
}

export class ProductService {
  async createProduct({ name, price, description }: PayloadProduct) {
    try {
      if (!name || !price || !description) {
        return new Error("fill all fields to register the product");
      }
      if (price <= 0) {
        return new Error("price cannot be negative ");
      }
      const newProduct = productRepository.create({
        name: name,
        price: price,
        description: description,
      });
      if (!newProduct) {
        return new Error("Product Registration Failed");
      }
      await productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      return new Error(error);
    }
  }
  async lisProduct() {
    try {
      let listUnpaidProducts = await productRepository.find({
        where: { status: productStatus.UNSOLD },
      });

      if (listUnpaidProducts.length === 0) {
        return new Error("you do not have products in stock");
      }

      return listUnpaidProducts;
    } catch (error) {
      return new Error(error);
    }
  }
}
