import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";
import userRepository from "@repositories/user/UserRepository";

import { normalizeString, removeSpecialCharacters } from "@utils/index";
import { User, getUserInput, validateUserInput } from "@models/user/UserModel";

const _ = require('lodash');

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
        message: "Users Retrieved Successfully.", 
        data: dataResponse 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Unable to estabilish a communication with the database. Try again later.",
        error: error 
      });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = String(req.params.id);
      const user = await userRepository.findById(userId);

      if (!user) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.NOT_FOUND, message: "User Not Found." });
        return;
      }

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "User Retrieved Successfully.", 
        data: user 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Unable to estabilish a communication with the database. Try again later.",
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
          message: "User Not Found." 
        });
        return;
      }

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "User Retrieved Successfully.", 
        data: user 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Unable to estabilish a communication with the database. Try again later.",
        error: error
      });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      const userInputData = getUserInput(userData);
      const errors = await validateUserInput(userInputData);

      if (errors.length > 0) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.BAD_REQUEST, 
          message: "Cannot create the user because the DTO entered is invalid.", 
          error: errors 
        });
        return;
      }

      const cpfAvailable = await userRepository.checkAvailableCpf(userInputData.cpf);
      const emailAvailable = await userRepository.checkAvailableEmail(userInputData.email);

      if (!cpfAvailable || !emailAvailable) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.BAD_REQUEST, 
          message: "Cannot create the user because the CPF or Email entered is already registered.",
          error: "Duplicated Keys:" + (!cpfAvailable ? " CPF." : "") + (!emailAvailable ? " Email." : "")
        });
        return;
      }

      const newUser = await userRepository.insertOne(new User(userInputData));

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.CREATED, 
        message: "User Created Successfully.", 
        data: newUser 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Unable to estabilish a communication with the database. Try again later.",
        error: error 
      });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = String(req.params.id).toUpperCase();
      const userData = req.body;
      const userInputData = getUserInput(userData);
      const errors = await validateUserInput(userInputData);

      if (errors.length > 0) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.BAD_REQUEST, 
          message: "Cannot update the user because the DTO entered is invalid.", 
          error: errors 
        });
        return;
      }

      const user = await userRepository.findById(userId);

      if (!user) {
        (res as ResponseInterface).apiFailure({ 
          statusCode: StatusCodes.NOT_FOUND, 
          message: "User Not Found." 
        });
        return;
      }

      if (removeSpecialCharacters(user.cpf) !== removeSpecialCharacters(userInputData.cpf)) {
        const cpfAvailable = await userRepository.checkAvailableCpf(userInputData.cpf);
        if (!cpfAvailable) {
          (res as ResponseInterface).apiFailure({ 
            statusCode: StatusCodes.BAD_REQUEST, 
            message: "Cannot update the user because the CPF entered is already registered.", 
            error: "Duplicated Key: CPF." 
          });
          return;
        }
      }

      if (user.email !== userInputData.email) {
        const emailAvailable = await userRepository.checkAvailableEmail(userInputData.email);
        if (!emailAvailable) {
          (res as ResponseInterface).apiFailure({ 
            statusCode: StatusCodes.BAD_REQUEST, 
            message: "Cannot update the user because the Email entered is already registered.", 
            error: "Duplicated Key: Email." 
          });
          return;
        }
      }

      userInputData.id = userId;
      const updatedUser = await userRepository.updateOne(userId, new User(userInputData));

      (res as ResponseInterface).apiSuccess({ 
        statusCode: StatusCodes.OK, 
        message: "User Updated Successfully.", 
        data: updatedUser 
      });

    } catch (error) {
      (res as ResponseInterface).apiFailure({ 
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
        message: "Unable to estabilish a communication with the database. Try again later.",
        error: error 
      });
    }
  }
}

export default UserController;
