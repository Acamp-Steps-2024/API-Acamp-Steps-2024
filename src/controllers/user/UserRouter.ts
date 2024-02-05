import express from "express";
import UserController from "./UserController";

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAllUsers);
UserRouter.get("/:id", UserController.getUserById);
UserRouter.get("/:cpf", UserController.getUserByCpf);

UserRouter.post("/", UserController.createUser);
UserRouter.put("/:id", UserController.updateUser);

export default UserRouter;
