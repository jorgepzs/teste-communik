import { PayloadProduct, ProductService } from "../services/ProductService";
import { Response, Request } from "express";

export class ProductController {
  async create(req: Request, res: Response) {
    try {
      const { name, description, price }: PayloadProduct = req.body;
      const service = new ProductService();
      const registerProduct = await service.createProduct({
        name,
        description,
        price,
      });
      if (registerProduct instanceof Error) {
        return res.status(400).json(registerProduct.message);
      }
      return res.status(201).json({
        message: `the product ${name} was successfully registered`,
        registerProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async list(req: Request, res: Response) {
    try {
      const service = new ProductService();
      const listUnpaidProducts = await service.lisProduct();
      if (listUnpaidProducts instanceof Error) {
        return res.status(400).json(listUnpaidProducts.message);
      }
      return res.status(200).json(listUnpaidProducts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
