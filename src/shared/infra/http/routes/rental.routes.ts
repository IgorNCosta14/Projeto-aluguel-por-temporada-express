import { ListPropertyController } from "@modules/property/useCase/ListProperty/ListPropertyController";
import { CreateRentalController } from "@modules/rental/useCase/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rental/useCase/DevolutionRental/DevolutionRentalController";
import { FindRentalByUserIdController } from "@modules/rental/useCase/FindByUserIdRental/FindRentalByUserIdController";
import { Router } from "express";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const findRentalByUserIdController = new FindRentalByUserIdController();
const listRentalController = new ListPropertyController();

rentalsRoutes.post("/", createRentalController.handle);
rentalsRoutes.get("/userrental", findRentalByUserIdController.handle);
rentalsRoutes.get("/", listRentalController.handle);

export { rentalsRoutes };
