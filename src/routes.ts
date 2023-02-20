import { authClientMiddleware } from "./middlewares/authClient.middleware";
import { authManagerMiddleware } from "./middlewares/authManager.middleware";
import { ManagerController } from "./controllers/ManagerController";
import { Router } from "express";
import { ClientController } from "./controllers/ClientController";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";
const routes = Router();

routes.post("/client", new ClientController().create);

routes.put("/login-client", new ClientController().login);

routes.post("/manager", new ManagerController().create);

routes.put("/login-manager", new ManagerController().login);

routes.post("/product", authManagerMiddleware, new ProductController().create);

routes.get("/product", authManagerMiddleware, new ProductController().list);

routes.post("/order", authClientMiddleware, new OrderController().create);

routes.put(
  "/paid-order",
  authClientMiddleware,
  new OrderController().updateStatus
);

export default routes;
