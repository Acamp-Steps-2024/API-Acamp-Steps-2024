import express from "express";
import ReportsController from "./ReportsController";

const ReportsRouter = express.Router();

ReportsRouter.get("/resume", ReportsController.resume);
ReportsRouter.get("/resumeByChurch/:church", ReportsController.resumeByChurch);

export default ReportsRouter;
