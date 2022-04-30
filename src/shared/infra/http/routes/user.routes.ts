import { CreateUserController } from "@modules/account/users/useCase/CreateUser/CreateUserController";
import { FindUserController } from "@modules/account/users/useCase/FindUser/FindUserController";
import { ListUsersController } from "@modules/account/users/useCase/ListUsers/ListUsersController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserController = new FindUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", listUsersController.handle);
usersRoutes.get("/find", findUserController.handle);

export { usersRoutes };
