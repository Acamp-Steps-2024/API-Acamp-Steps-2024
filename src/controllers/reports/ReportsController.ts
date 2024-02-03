import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseInterface} from "@middlewares/responseHandler/ResponseMiddleware";

import { ChurchInterface } from "@models/church/ChurchInterface";
import { ChurchMapper } from "@models/church/ChurchMapper";

import userRepository from "@repositories/user/UserRepository";
import { SexInterface } from "@models/sex/SexInterface";
import { SexMapper } from "@models/sex/SexMapper";
import { TicketMapper } from "@models/ticket/TicketMapper";
import { TicketInterface } from "@models/ticket/TicketInterface";
import { PaymentMapper } from "@models/payment/PaymentMapper";
import { PaymentInterface } from "@models/payment/PaymentInterface";
import { getAge } from "@utils/index";
class ReportsController {
    static async getNumberOfInscriptionsByChurch(req: Request, res: Response<ResponseInterface>): Promise<void> {
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
                message: "Summary of Inscriptions Report Filtered By Church Successfully obtained.",
                data: churchsSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async getInscriptionsByChurch(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const churchId = Number(req.params.church);
            const allUsers = await userRepository.findAll();

            if (ChurchMapper.get(churchId) === undefined) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "The church ID provided does not exist. Please enter a valid id and try again later." 
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
                message: `Summary of Inscriptions Report Filtered By Church '${churchName}' Successfully obtained.`,
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

    static async getNumberOfInscriptionsBySex(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const sexSummariesResponse: { sex: SexInterface; totalDocs: number}[] = [];
            const sexInscriptionsMap = new Map<SexInterface, number>();

            allUsers.forEach((user) => {
                const totalDocs = sexInscriptionsMap.get(user.sex) || 0;
                sexInscriptionsMap.set(user.sex, totalDocs + 1);
            });

            sexInscriptionsMap.forEach((totalDocs, sex) => {
                sexSummariesResponse.push({ sex, totalDocs });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of Inscriptions Report Filtered by Sex Successfully obtained.",
                data: sexSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async getInscriptionsBySex(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const sexType = String(req.params.sex).toUpperCase();
            const allUsers = await userRepository.findAll();

            if (SexMapper.get(sexType) === undefined) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "Invalid sex type provided." 
                });
                return;
            }

            const sexName = SexMapper.get(sexType) as unknown as SexInterface;
            const usersBySex = allUsers.filter((user) => user.sex === sexName);

            const dataResponse = {
                docs: usersBySex,
                totalDocs: usersBySex.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: `Summary of Inscriptions Report Filtered By Sex '${sexName}' Successfully obtained.`,
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

    static async getNumberOfInscriptionsByTicket(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const ticketSummariesResponse: { ticket: TicketInterface; totalDocs: number}[] = [];
            const ticketInscriptionsMap = new Map<TicketInterface, number>();

            allUsers.forEach((user) => {
                const totalDocs = ticketInscriptionsMap.get(user.ticket) || 0;
                ticketInscriptionsMap.set(user.ticket, totalDocs + 1);
            });

            ticketInscriptionsMap.forEach((totalDocs, ticket) => {
                ticketSummariesResponse.push({ ticket, totalDocs });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of Inscriptions Report Filtered by Ticket Successfully obtained.",
                data: ticketSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async getInscriptionsByTicket(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const ticketType = Number(req.params.ticket);
            const allUsers = await userRepository.findAll();

            if (TicketMapper.get(ticketType) === undefined) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "The Ticket Type provided does not exist. Please enter a valid id and try again later."
                });
                return;
            }

            const ticketName = TicketMapper.get(ticketType) as unknown as TicketInterface;
            const usersByTicket = allUsers.filter((user) => user.ticket === ticketName);

            const dataResponse = {
                docs: usersByTicket,
                totalDocs: usersByTicket.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: `Summary of Inscriptions Report Filtered By Ticket '${ticketName}' Successfully obtained.`,
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

    static async getNumberOfInscriptionsByPayment(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const paymentSummariesResponse: { payment: PaymentInterface; totalDocs: number}[] = [];
            const paymentInscriptionsMap = new Map<PaymentInterface, number>();

            allUsers.forEach((user) => {
                const totalDocs = paymentInscriptionsMap.get(user.payment) || 0;
                paymentInscriptionsMap.set(user.payment, totalDocs + 1);
            });

            paymentInscriptionsMap.forEach((totalDocs, payment) => {
                paymentSummariesResponse.push({ payment, totalDocs });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of Inscriptions Report Filtered by Payment Successfully obtained.",
                data: paymentSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async getInscriptionsByPayment(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const paymentType = String(req.params.payment).toUpperCase();
            const allUsers = await userRepository.findAll();

            if (PaymentMapper.get(paymentType) === undefined) {
                (res as ResponseInterface).apiFailure({ 
                    statusCode: StatusCodes.BAD_REQUEST, 
                    message: "The Payment Type provided does not exist. Please enter a valid id and try again later."
                });
                return;
            }

            const paymentStatus = PaymentMapper.get(paymentType) as unknown as PaymentInterface;
            const usersByPayment = allUsers.filter((user) => user.payment === paymentStatus);

            const dataResponse = {
                docs: usersByPayment,
                totalDocs: usersByPayment.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: `Summary of Inscriptions Report Filtered By Payment '${paymentStatus}' Successfully obtained.`,
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

    static async getNumberOfInscriptionsByCheckin(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const checkinSummariesResponse: { checkin: boolean; totalDocs: number}[] = [];
            const checkinInscriptionsMap = new Map<boolean, number>();

            allUsers.forEach((user) => {
                const totalDocs = checkinInscriptionsMap.get(user.checkinDate !== null) || 0;
                checkinInscriptionsMap.set(user.checkinDate !== null, totalDocs + 1);
            });

            checkinInscriptionsMap.forEach((totalDocs, checkin) => {
                checkinSummariesResponse.push({ checkin, totalDocs });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of Inscriptions Report Filtered by Checkin Successfully obtained.",
                data: checkinSummariesResponse 
            });
            
        } catch (error) {
            (res as ResponseInterface).apiFailure({ 
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
                message: "Unable to estabilish a communication with the database. Try again later.",
                error: error 
            });
        }
    }

    static async getInscriptionsByCheckin(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            const checkinType = Boolean(req.params.checkin);
            const allUsers = await userRepository.findAll();

            const usersByCheckin = allUsers.filter((user) => user.checkinDate !== null);

            const dataResponse = {
                docs: usersByCheckin,
                totalDocs: usersByCheckin.length
            };

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: `Summary of Inscriptions Report Filtered By Checkin '${checkinType}' Successfully obtained.`,
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

    static async getNumberOfInscriptionsByAge(req: Request, res: Response<ResponseInterface>): Promise<void> {
        try {
            let allUsers = await userRepository.findAll();

            const ageSummariesResponse: { age: number; totalDocs: number}[] = [];
            const ageInscriptionsMap = new Map<number, number>();

            allUsers.forEach((user) => {
                const age = getAge(user.birthDate);
                const totalDocs = ageInscriptionsMap.get(age) || 0;
                ageInscriptionsMap.set(age, totalDocs + 1);
            });

            ageInscriptionsMap.forEach((totalDocs, age) => {
                ageSummariesResponse.push({ age, totalDocs });
            });

            (res as ResponseInterface).apiSuccess({ 
                statusCode: StatusCodes.OK, 
                message: "Summary of Inscriptions Report Filtered by Age Successfully obtained.",
                data: ageSummariesResponse 
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

// filtro por idade (menor de  18 e maior de 18)

export default ReportsController;