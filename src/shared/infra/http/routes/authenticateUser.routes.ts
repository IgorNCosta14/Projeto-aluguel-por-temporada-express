import { AuthenticateUserController } from "@modules/account/users/useCase/AuthenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateUserRoutes = Router();

const authenticateUserController = new AuthenticateUserController()


authenticateUserRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateUserRoutes };
