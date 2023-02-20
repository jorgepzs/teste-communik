import { compare, hash } from "bcryptjs";
import { managerRepository } from "./../repositories/managerRepository";
import * as jwt from "jsonwebtoken";

export interface PayloadCreateManager {
  username: string;
  password: string;
}
export class ManagerService {
  async registerManager({ username, password }: PayloadCreateManager) {
    try {
      if (!username || !password) {
        return new Error("Incorrect Payload");
      }
      if (typeof username != "string" || typeof password != "string") {
        return new Error("Incorrect Payload");
      }
      const verifyUsernameInUse = await managerRepository.findOneBy({
        username: username.replace(/\s/g, ""),
      });

      if (verifyUsernameInUse) {
        return new Error(`the username ${username} already in use `);
      }

      const trimUsername = username.replace(/\s/g, "");

      const trimPassword = password.replace(/\s/g, "");

      const hashPassword = await hash(trimPassword, 10);

      const newManager = managerRepository.create({
        username: trimUsername,
        password: hashPassword,
      });

      if (!newManager) {
        return new Error("Registration Failed");
      }
      await managerRepository.save(newManager);

      newManager.password = undefined;

      return newManager;
    } catch (error) {
      return console.log(error, "Registration Failed");
    }
  }
  async loginManager({ username, password }) {
    const trimUsername = username.replace(/\s/g, "");

    const trimPassword = password.replace(/\s/g, "");

    const verifyExists = await managerRepository.findOneBy({
      username: trimUsername,
    });
    if (!verifyExists) {
      return new Error(`The Username ${trimUsername} Not Found`);
    }
    const checkPassword = await compare(trimPassword, verifyExists.password);
    if (!checkPassword) {
      return new Error(`Password Not Correct`);
    }
    verifyExists.password = undefined;

    const token = jwt.sign(
      { id: verifyExists.id },
      process.env.JWT_PASS ?? "",
      {
        expiresIn: "1d",
      }
    );
    return { token: token, user: verifyExists };
  }
  catch(error) {
    return console.log(error, "Registration Failed");
  }
}
