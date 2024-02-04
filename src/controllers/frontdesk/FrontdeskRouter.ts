import express from "express";
import { FrontdeskController } from "./FrontdeskController";

const FrontdeskRouter = express.Router();

FrontdeskRouter.get('/checkin', FrontdeskController.getAllCheckinUsers);
FrontdeskRouter.post('/checkin', FrontdeskController.registerCheckin);

FrontdeskRouter.get('/checkout', FrontdeskController.getAllCheckoutsUsers);
FrontdeskRouter.post('/checkout', FrontdeskController.registerCheckout);

export default FrontdeskRouter;
