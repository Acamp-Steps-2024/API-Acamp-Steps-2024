import { Request, Response } from "express";
import userRepository from "../../repositories/user/UserRepository";
import { HTTPError } from "@models/errorHandling";
import { ResponseDto } from "@models/responsesDto";

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = userRepository.findAll();
      res.status(200).send(new ResponseDto("Success", users));

    } catch (error) {
      throw new HTTPError(500, "Internal server error", error);
    }
  }
}

export default UserController;
