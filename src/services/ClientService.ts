import { clientRepository } from "../repositories/clientRepository";
import { compare, hash } from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class ClientService {
  async createClient({ username, password }) {
    try {
      if (!username || !password) {
        return new Error("invalid Payload");
      }
      if (typeof username != "string" || typeof password != "string") {
        {
          return new Error("invalid Payload");
        }
      }
      const verifyUsernameInUse = await clientRepository.findOneBy({
        username: username.replace(/\s/g, ""),
      });

      if (verifyUsernameInUse) {
        return new Error(`the username ${username} already in use `);
      }

      const trimUsername = username.replace(/\s/g, "");

      const trimPassword = password.replace(/\s/g, "");

      const hashPassword = await hash(trimPassword, 10);

      const newClient = clientRepository.create({
        username: trimUsername,
        password: hashPassword,
      });

      if (!newClient) {
        return new Error("Registration Failed");
      }
      await clientRepository.save(newClient);

      newClient.password = undefined;

      return newClient;
    } catch (error) {
      return console.log(error, "Registration Failed");
    }
  }
  async LoginClient({ username, password }) {
    try {
      if (!username || !password) {
        return new Error("invalid Payload");
      }
      const trimUsername = username.replace(/\s/g, "");

      const trimPassword = password.replace(/\s/g, "");

      const verifyExists = await clientRepository.findOneBy({
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
    } catch (error) {
      return console.log(error, "Registration Failed");
    }
  }
}
