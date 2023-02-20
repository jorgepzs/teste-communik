import { PayloadCreateManager } from "../services/ManagerService";
import { Response, Request } from "express";
import { ManagerService } from "../services/ManagerService";

export class ManagerController {
  async create(req: Request, res: Response) {
    try {
      const { username, password }: PayloadCreateManager = req.body;
      const service = new ManagerService();

      const manager = await service.registerManager({ username, password });
      if (manager instanceof Error) {
        return res.status(400).json(manager.message);
      }
      return res
        .status(201)
        .json({ message: "Your Manager Account Created Sucessfull", manager });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async login(req: Request, res: Response) {
    const { username, password }: PayloadCreateManager = req.body;
    try {
      const service = new ManagerService();
      const managerLogin = await service.loginManager({
        username,
        password,
      });
      if (managerLogin instanceof Error) {
        return res.status(400).json(managerLogin.message);
      }
      return res
        .status(200)
        .json({ message: "Login Sucessfull", managerLogin });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
