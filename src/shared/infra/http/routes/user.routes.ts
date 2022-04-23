import { CreateUserController } from "@modules/users/useCase/CreateUser/CreateUserController";
import { FindUserController } from "@modules/users/useCase/FindUser/FindUserController";
import { ListUsersController } from "@modules/users/useCase/ListUsers/ListUsersController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserController = new FindUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", checkAuthenticated, checkAdmin, listUsersController.handle);
usersRoutes.get("/find", checkAuthenticated, checkAdmin,findUserController.handle);

export { usersRoutes };
