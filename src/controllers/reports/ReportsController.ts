import { Request, Response } from "express";
import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";
import userRepository from "@repositories/user/UserRepository";
import { StatusCodes } from "http-status-codes";
import { normalizeString } from "@utils/index";

class ReportsController {
    static async resume(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: "Cannot get resume report", error: error });
        }
    }

    static async resumeByChurch(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const church = req.params.church;
            let allUsers = await userRepository.findAll();

           

            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: "Cannot get resume report by church", error: error });
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