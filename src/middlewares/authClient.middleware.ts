import { clientRepository } from "./../repositories/clientRepository";
import * as jwt from "jsonwebtoken";

export const authClientMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const [schema, token] = parts;

    if (schema != "Bearer") {
      return res.status(401).json({ message: "Invalid token" });
    }

    jwt.verify(token, process.env.JWT_PASS, async (error, decoded: any) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      const verifyClientId = await clientRepository.findOneBy({
        id: decoded.id,
      });
      if (!verifyClientId || !verifyClientId.id) {
        return res.status(401).send({ message: "invalid token" });
      }
      req.clientId = verifyClientId.id;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
