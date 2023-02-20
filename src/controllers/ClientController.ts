import { Request, Response } from "express";
import { ClientService } from "../services/ClientService";

export class ClientController {
  async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const service = new ClientService();

      const client = await service.createClient({
        username,
        password,
      });
      if (client instanceof Error) {
        return res.status(400).json(client.message);
      }
      return res
        .status(201)
        .json({ message: "your Account Created Sucessfull", client });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const service = new ClientService();
      const clientLogin = await service.LoginClient({
        username,
        password,
      });
      if (clientLogin instanceof Error) {
        return res.status(400).json(clientLogin.message);
      }
      return res.status(200).json({ message: "Login Sucessfull", clientLogin });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
