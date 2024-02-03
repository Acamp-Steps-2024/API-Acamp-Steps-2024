import express from "express";
import { Settings } from "@config/Settings";

import UserRouter from "./controllers/user/UserRouter";
import { responseMiddleware } from "@middlewares/responseHandler/ResponseMiddleware";

const App = express();
const Router = express.Router();

App.use(express.json());
App.use(responseMiddleware);

Router.use("/users", UserRouter);
App.use(`/${Settings.API_VERSION}`, Router);

App.listen(3000, () => console.log("Server is running on port 3000"));