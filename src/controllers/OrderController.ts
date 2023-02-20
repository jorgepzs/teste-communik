import { Response, Request } from "express";
import { OrderService, PayloadOrderCreate } from "../services/OrderService";

export class OrderController {
  async create(req: Request, res: Response) {
    try {
      const { clientId, products }: PayloadOrderCreate = req.body;
      const service = new OrderService();
      const registerOrder = await service.registerOrder({
        clientId,
        products,
      });

      if (registerOrder instanceof Error) {
        return res.status(400).json(registerOrder.message);
      }

      if (!registerOrder) {
        return res.status(400).json({ message: "Internal Server Error" });
      }
      return res.status(201).json({
        message: `the order was successfully registered`,
        registerOrder,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async updateStatus(req: Request, res: Response) {
    try {
      const orderId = req.body;
      const service = new OrderService();
      const updateOrderStatus = await service.PaidOrder(orderId);
      if (updateOrderStatus instanceof Error) {
        return res.status(400).json(updateOrderStatus.message);
      }
      return res.status(201).json({
        message: `the order was paid succesful`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
