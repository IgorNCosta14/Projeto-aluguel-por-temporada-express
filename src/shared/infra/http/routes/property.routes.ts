import { CreatePropertyController } from "@modules/property/useCase/CreateProperty/CreatePropertyController";
import { DeletePropertyController } from "@modules/property/useCase/DeleteProperty/DeletePropertyController";
import { FindPropertyByZipCodeController } from "@modules/property/useCase/FindPropertyByZipCode/FindPropertyByZipCodeController";
import { FindPropertyByTypeController } from "@modules/property/useCase/FindPropertyByType/FindPropertyByTypeController";
import { ListPropertyController } from "@modules/property/useCase/ListProperty/ListPropertyController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const propertyRoutes = Router();

const createPropertyController = new CreatePropertyController();
const deletePropertyController = new DeletePropertyController();
const findPropertyByZipCodeController = new FindPropertyByZipCodeController();
const findPropertyByTypeController = new FindPropertyByTypeController();
const listPropertyController = new ListPropertyController();

propertyRoutes.post("/", checkAuthenticated, checkAdmin, createPropertyController.handle);
propertyRoutes.delete("/:id", checkAuthenticated, checkAdmin, deletePropertyController.handle);
propertyRoutes.get("/zipCode", findPropertyByZipCodeController.handle);
propertyRoutes.get("/type", findPropertyByTypeController.handle);
propertyRoutes.get("/", listPropertyController.handle);

export { propertyRoutes };
