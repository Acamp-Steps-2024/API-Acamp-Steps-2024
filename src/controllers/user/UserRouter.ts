import express from "express";
import UserController from "./UserController";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.get("/:cpf", UserController.getUserByCpf);

export default UserRouter;
