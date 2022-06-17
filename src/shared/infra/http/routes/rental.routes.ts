import { CreateRentalController } from "@modules/rental/useCase/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rental/useCase/DevolutionRental/DevolutionRentalController";
import { FindRentalByUserIdController } from "@modules/rental/useCase/FindByUserIdRental/FindRentalByUserIdController";
import { ListRentalController } from "@modules/rental/useCase/ListRentals/ListRentalController";
import { Router } from "express";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const findRentalByUserIdController = new FindRentalByUserIdController();
const listRentalController = new ListRentalController();

rentalsRoutes.post("/", checkAuthenticated, createRentalController.handle);
rentalsRoutes.get("/userrental", checkAuthenticated, findRentalByUserIdController.handle);
rentalsRoutes.get("/", checkAuthenticated, listRentalController.handle);

export { rentalsRoutes };
