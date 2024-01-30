import express from "express";

import UserController from "./UserController";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);


export default UserRouter;
