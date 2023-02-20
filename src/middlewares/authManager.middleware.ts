import { Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import { managerRepository } from "../repositories/managerRepository";

export const authManagerMiddleware = async (req: Request, res: Response, next) => {
  const { authorization } = req.headers;
  try { 
    if (!authorization){return res.status(401).json({message:"Invalid token"})}

    const parts = authorization.split(" ");

    if (parts.length !== 2) {return res.status(401).json({message:"Invalid token"})}

    const [schema, token] = parts;

    if (schema != "Bearer") {return res.status(401).json({message:"Invalid token"})}

    jwt.verify(token, process.env.JWT_PASS, async (error, decoded: any) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      const verifyManagerId = await managerRepository.findOneBy({
        id: decoded.id,
      });
      if (!verifyManagerId || !verifyManagerId.id) {
        return res.status(401).send({ message: "invalid token" });
      }
      return next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
