import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DATABASE_CHECKIN_COLUMN, DATABASE_CHECKOUT_COLUMN, DATABASE_ID_COLUMN } from "@config/Constants";
import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";

import userRepository from "@repositories/user/UserRepository";
import { convertDateToString } from "@utils/index";
import { generateRandomID } from "@models/user/UserModel";

export class FrontdeskController {
    static async getAllCheckinUsers(req: Request, res: Response, next: any) {
        try {
            const allUsers = await userRepository.findAll();
            const usersWhoCheckedIn = allUsers.filter((user) => user.checkinDate !== null);

            const dataResponse = {
                docs: usersWhoCheckedIn,
                totalDocs: usersWhoCheckedIn.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of All Users who Checked In Successfully Obtained.",
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

    static async getAllCheckoutsUsers(req: Request, res: Response, next: any) {
        try {
            const allUsers = await userRepository.findAll();
            const usersWhoCheckedOut = allUsers.filter((user) => user.checkoutDate !== null);

            const dataResponse = {
                docs: usersWhoCheckedOut,
                totalDocs: usersWhoCheckedOut.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of All Users who Checked Out Successfully Obtained.",
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

    static async registerCheckin(req: Request, res: Response, next: any) {
        try {
            const userIdParam = String(req.body.userId);
            const allUsers = await userRepository.findAll();

            const rowIndexID = allUsers.findIndex((user) => user.id === userIdParam);

            if (rowIndexID === -1) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "Cannot register checkin because user does not exist.",
                    error: null
                });
                return;
            }

            const userUpdated = await userRepository.updateOneAttribute(userIdParam, DATABASE_CHECKIN_COLUMN, convertDateToString(new Date()));

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.CREATED,
                message: "User successfully checked in.",
                data: userUpdated
            });
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async registerCheckout(req: Request, res: Response, next: any) {
        try {
            const userIdParam = String(req.body.userId);
            const allUsers = await userRepository.findAll();

            const rowIndexID = allUsers.findIndex((user) => user.id === userIdParam);

            if (rowIndexID === -1) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "Cannot register checkout because user does not exist.",
                    error: null
                });
                return;
            }

            const userUpdated = await userRepository.updateOneAttribute(userIdParam, DATABASE_CHECKOUT_COLUMN, convertDateToString(new Date()));

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.CREATED,
                message: "User successfully checked out.",
                data: userUpdated
            });
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async generateIds(req: Request, res: Response, next: any) {
        try {
            const allUsers = await userRepository.findAll(false);
            const churchOfAllUsers = allUsers.map((user) => user.church);

            let ids = churchOfAllUsers.map((church) => generateRandomID(church));
            let duplicatesIds = new Set(ids).size !== ids.length;

            while (duplicatesIds) {
                ids = churchOfAllUsers.map((church) => generateRandomID(church));
                duplicatesIds = new Set(ids).size !== ids.length;
            }

            await userRepository.setAllIdsForUsers(DATABASE_ID_COLUMN, allUsers, ids);

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK,
                message: "All User IDs Successfully Updated.",
                data: allUsers
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