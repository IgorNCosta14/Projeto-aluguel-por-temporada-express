import { CreatePermissionController } from "@modules/account/users/useCase/CreatePermission/CreatePermissionController";
import { Router } from "express";

const permissionRoutes = Router();

const createPermissionController = new CreatePermissionController()

permissionRoutes.post("/", createPermissionController.handle);

export { permissionRoutes };