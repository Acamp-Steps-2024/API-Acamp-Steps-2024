import express from "express";
import ReportsController from "./ReportsController";

// TODO: pass to a constant file
const INSCRIPTION_MODULE = "inscriptions";

const ReportsRouter = express.Router();

ReportsRouter.get(`/${INSCRIPTION_MODULE}/resume`, ReportsController.resume);
ReportsRouter.get(`/${INSCRIPTION_MODULE}/resume-by-church`, ReportsController.resumeInscriptionsOfAllChurchs);
ReportsRouter.get(`/${INSCRIPTION_MODULE}/resume-by-church/:church`, ReportsController.inscriptionsByChurch);

export default ReportsRouter;
