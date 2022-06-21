import { CreateUserController } from "@modules/account/users/useCase/CreateUser/CreateUserController";
import { DeactivatingUserController } from "@modules/account/users/useCase/DeactivatingUser/DeactivatingUserController";
import { FindUserController } from "@modules/account/users/useCase/FindUser/FindUserController";
import { ListUsersController } from "@modules/account/users/useCase/ListUsers/ListUsersController";
import { UpdateToLandLordController } from "@modules/account/users/useCase/UpdateToLandLord/UpdateToLandLordController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const findUserController = new FindUserController();
const updateToLandLordController = new UpdateToLandLordController();
const deactivatingUserController = new DeactivatingUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/", checkAuthenticated, checkAdmin,listUsersController.handle);
usersRoutes.get("/find", checkAuthenticated, checkAdmin,findUserController.handle);
usersRoutes.patch("/tolandlord/:id", checkAuthenticated, checkAdmin, updateToLandLordController.handle)
usersRoutes.patch("/deactivatinguser/:id", checkAuthenticated, checkAdmin,deactivatingUserController.handle)

export { usersRoutes };
