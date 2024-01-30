import express from "express";

import { Request, Response, NextFunction } from "express";
import { HTTPError, isHTTPError } from "./models/errorHandling";
import { ResponseDto } from "./models/responsesDto";
import UserRouter from "./controllers/user/UserRouter";

const App = express();
const Router = express.Router();

App.use(express.json());

App.use((request: Request, response: Response, next: NextFunction): void => {
    const oldResponseSend = response.send;

    response.send = (body: any): Response => {
        if (body instanceof ResponseDto) {
            response.send = oldResponseSend;
            return oldResponseSend.call(response, body);
        }
        response.send = oldResponseSend;
        return oldResponseSend.call(response, new ResponseDto("Success", body));
    }
    next();
})

App.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
    if (isHTTPError(error)) {
        response.status((error as HTTPError).status).send((error as HTTPError).message);
    } else {
        next(error);
    }
})

Router.use("/users", UserRouter);
App.use(Router);

App.listen(3000, () => console.log("Server is running"));