import { CreatePropertyController } from "@modules/property/useCase/CreateProperty/CreatePropertyController";
import { DeletePropertyController } from "@modules/property/useCase/DeleteProperty/DeletePropertyController";
import { FindPropertyByZipCodeController } from "@modules/property/useCase/FindPropertyByZipCode/FindPropertyByZipCodeController";
import { FindPropertyByTypeController } from "@modules/property/useCase/FindPropertyByType/FindPropertyByTypeController";
import { ListPropertyController } from "@modules/property/useCase/ListProperty/ListPropertyController";
import { Router } from "express";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";
import { checkLandLord } from "../middlewares/checkLandLord";
import { UpdatePropertyController } from "@modules/property/useCase/UpdateProperty/UpdatePropertyController";
import { FindPropertyByOwnerController } from "@modules/property/useCase/FindPropertyByOwner/FindPropertyByOwnerController";

const propertyRoutes = Router();

const createPropertyController = new CreatePropertyController();
const deletePropertyController = new DeletePropertyController();
const findPropertyByZipCodeController = new FindPropertyByZipCodeController();
const findPropertyByTypeController = new FindPropertyByTypeController();
const listPropertyController = new ListPropertyController();
const updatePropertyController = new UpdatePropertyController();
const findPropertyByOwnerController = new FindPropertyByOwnerController()

propertyRoutes.post("/",checkAuthenticated, checkLandLord, createPropertyController.handle);
propertyRoutes.delete("/:id", checkAuthenticated, checkLandLord, deletePropertyController.handle);
propertyRoutes.patch("/:id", checkAuthenticated, checkLandLord, updatePropertyController.handle);
propertyRoutes.get("/zipCode", findPropertyByZipCodeController.handle);
propertyRoutes.get("/type", findPropertyByTypeController.handle);
propertyRoutes.get("/", listPropertyController.handle);
propertyRoutes.get("/userproperty", checkAuthenticated, checkLandLord, findPropertyByOwnerController.handle)

export { propertyRoutes };
