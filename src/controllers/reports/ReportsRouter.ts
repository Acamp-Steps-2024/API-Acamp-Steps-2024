import express from "express";
import { REPORTS_INSCRIPTION_MODULE } from "@config/Constants";
import ReportsController from "./ReportsController";

const ReportsRouter = express.Router();

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-church`, ReportsController.getNumberOfInscriptionsByChurch);
ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-church/:church`, ReportsController.getInscriptionsByChurch);

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-sex`, ReportsController.getNumberOfInscriptionsBySex);
ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-sex/:sex`, ReportsController.getInscriptionsBySex);

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-ticket`, ReportsController.getNumberOfInscriptionsByTicket);
ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-ticket/:ticket`, ReportsController.getInscriptionsByTicket);

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-payment`, ReportsController.getNumberOfInscriptionsByPayment);
ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-payment/:payment`, ReportsController.getInscriptionsByPayment);

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-checkin`, ReportsController.getNumberOfInscriptionsByCheckin);
ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-checkin/:checkin`, ReportsController.getInscriptionsByCheckin);

ReportsRouter.get(`/${REPORTS_INSCRIPTION_MODULE}/resume-by-age`, ReportsController.getNumberOfInscriptionsByAge);

export default ReportsRouter;
