import { Request, Response } from "express";
import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";
import userRepository from "@repositories/user/UserRepository";
import { StatusCodes } from "http-status-codes";
import { normalizeString } from "@utils/index";

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      let allUsers = await userRepository.findAll();

      if (req.query.name) {
        const searchName = normalizeString(req.query.name as string);
        allUsers = allUsers.filter((user) => {
          return normalizeString(user.name).includes(searchName);
        });
      }

      if (req.query.church) {
        const searchChurch = normalizeString(req.query.church as string);
        allUsers = allUsers.filter((user) => {
          return normalizeString(user.church.name).includes(searchChurch);
        });
      }

      if (req.query.checkin) {
        allUsers = allUsers.filter((user) => {
          return user.checkinDate !== null;
        });
      }

      const dataResponse = {
        docs: allUsers,
        totalDocs: allUsers.length
      };

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "Users Retrieved Successfully", 
        data: dataResponse 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Cannot get users from database", 
        error: error 
      });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);
      const user = await userRepository.findById(userId);

      if (!user) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.NOT_FOUND, message: "User Not Found" });
        return;
      }

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "User Retrieved Successfully", 
        data: user 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Cannot get users from database", 
        error: error 
      });
    }
  }

  static async getUserByCpf(req: Request, res: Response): Promise<void> {
    try {
      const userCpf = req.params.cpf;
      const user = await userRepository.findByCpf(userCpf);

      if (!user) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.NOT_FOUND, 
          message: "User Not Found" 
        });
        return;
      }

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "User Retrieved Successfully", 
        data: user 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Cannot get users from database", error: error 
      });
    }
  }
}

export default UserController;
