import express from "express";
const cors = require("cors");
import { Settings } from "@config/Settings";

import UserRouter from "@controllers/user/UserRouter";
import FrontdeskRouter from "@controllers/frontdesk/FrontdeskRouter";
import ReportsRouter from "@controllers/reports/ReportsRouter";
import { responseMiddleware } from "@middlewares/responseHandler/ResponseMiddleware";

const App = express();
const Router = express.Router();

App.use(express.json());
App.use(responseMiddleware);
App.use(
    cors({
        origin: Settings.CORS_ORIGIN,
    })
)

Router.use("/reports", ReportsRouter);
Router.use("/users", UserRouter);
Router.use("/frontdesk", FrontdeskRouter);
App.use(`/api/${Settings.API_VERSION}`, Router);

App.listen(4000, () => console.log("Server is running on port 4000"));