import { CreatePermissionController } from "@modules/account/users/useCase/CreatePermission/CreatePermissionController";
import { ListPermissionsController } from "@modules/account/users/useCase/ListPermissions/ListPermissionsController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const permissionRoutes = Router();

const createPermissionController = new CreatePermissionController();
const listPermissionsController = new ListPermissionsController();

permissionRoutes.post("/", checkAuthenticated, checkAdmin, createPermissionController.handle);
permissionRoutes.get("/", checkAuthenticated, checkAdmin, listPermissionsController.handle);

export { permissionRoutes };