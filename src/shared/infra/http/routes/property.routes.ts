import { CreatePropertyController } from "@modules/property/useCase/CreateProperty/CreatePropertyController";
import { DeletePropertyController } from "@modules/property/useCase/DeleteProperty/DeletePropertyController";
import { FindPropertyByCEPController } from "@modules/property/useCase/FindPropertyByCep/FindPropertyByCEPController";
import { FindPropertyByTypeController } from "@modules/property/useCase/FindPropertyByType/FindPropertyByTypeController";
import { ListPropertyController } from "@modules/property/useCase/ListProperty/ListPropertyController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const propertyRoutes = Router();

const createPropertyController = new CreatePropertyController();
const deletePropertyController = new DeletePropertyController();
const findByCEPPropertyController = new FindPropertyByCEPController();
const findByTypePropertyController = new FindPropertyByTypeController();
const listPropertyController = new ListPropertyController();

propertyRoutes.post("/", checkAuthenticated, checkAdmin, createPropertyController.handle);
propertyRoutes.delete("/:id", checkAuthenticated, checkAdmin, deletePropertyController.handle);
propertyRoutes.get("/cep", findByCEPPropertyController.handle);
propertyRoutes.get("/type", findByTypePropertyController.handle);
propertyRoutes.get("/", listPropertyController.handle);

export { propertyRoutes };
