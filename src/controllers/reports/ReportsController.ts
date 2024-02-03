import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";

import { ChurchInterface } from "@models/church/ChurchInterface";
import { ChurchMapper } from "@models/church/ChurchMapper";

import userRepository from "@repositories/user/UserRepository";
class ReportsController {
    static async resume(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Cannot get resume report.", 
                error: error 
            });
        }
    }

    static async resumeInscriptionsOfAllChurchs(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const churchsSummariesResponse: { churchName: ChurchInterface; totalInscriptions: number }[] = [];
            const churchInscriptionsMap = new Map<ChurchInterface, number>();

            allUsers.forEach((user) => {
                const totalInscriptions = churchInscriptionsMap.get(user.church) || 0;
                churchInscriptionsMap.set(user.church, totalInscriptions + 1);
            });

            churchInscriptionsMap.forEach((totalInscriptions, churchName) => {
                churchsSummariesResponse.push({ churchName, totalInscriptions });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Resume report by church.",
                data: churchsSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Cannot get resume report by church.", 
                error: error 
            });
        }
    }

    static async inscriptionsByChurch(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const churchId = Number(req.params.church);
            const allUsers = await userRepository.findAll();

            if (ChurchMapper.get(churchId) === undefined) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "Invalid church id provided." 
                });
                return;
            }

            const churchName = ChurchMapper.get(churchId) as unknown as ChurchInterface;
            const usersByChurch = allUsers.filter((user) => user.church === churchName);

            const dataResponse = {
                docs: usersByChurch,
                totalDocs: usersByChurch.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: `Users from church ${churchName} retrieved successfully.`, 
                data: dataResponse
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Cannot get resume report by church.", 
                error: error 
            });
        }
    }
}

// filtro por igreja
// filtro por sexo
// filtro por idade (menor de  18 e maior de 18)
// filtro por quantidade de checkin
// filtro por status de pagamento
// filtro por quantidade de inscritos (acampantes e diarias)

export default ReportsController;