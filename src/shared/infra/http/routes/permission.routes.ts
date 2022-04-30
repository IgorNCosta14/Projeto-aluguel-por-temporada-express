import { CreatePermissionController } from "@modules/account/users/useCase/CreatePermission/CreatePermissionController";
import { ListPermissionsController } from "@modules/account/users/useCase/ListPermissions/ListPermissionsController";
import { Router } from "express";

const permissionRoutes = Router();

const createPermissionController = new CreatePermissionController();
const listPermissionsController = new ListPermissionsController();

permissionRoutes.post("/", createPermissionController.handle);
permissionRoutes.get("/", listPermissionsController.handle);

export { permissionRoutes };