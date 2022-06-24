import { CreateRentalController } from "@modules/rental/useCase/CreateRental/CreateRentalController";
import { DeleteRentalController } from "@modules/rental/useCase/DeleteRental/DeleteRentalController";
import { DevolutionRentalController } from "@modules/rental/useCase/DevolutionRental/DevolutionRentalController";
import { FindRentalByUserIdController } from "@modules/rental/useCase/FindRentalByUserId/FindRentalByUserIdController";
import { ListFinishedRentalsControllers } from "@modules/rental/useCase/ListFinishedRentals/ListFinishedRentalsControllers";
import { ListRentalController } from "@modules/rental/useCase/ListRentals/ListRentalController";
import { ListRentalsInProgressControllers } from "@modules/rental/useCase/ListRentalsInProgress/ListRentalsInProgressControllers";
import { UpdateRentalController } from "@modules/rental/useCase/UpdateRental/UpdateRentalController";
import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin";
import { checkAuthenticated } from "../middlewares/checkAuthenticates";
import { checkLandLord } from "../middlewares/checkLandLord";

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const findRentalByUserIdController = new FindRentalByUserIdController();
const listRentalController = new ListRentalController();
const listRentalsInProgressControllers = new ListRentalsInProgressControllers();
const listFinishedRentalsControllers = new ListFinishedRentalsControllers();
const updateRentalController = new UpdateRentalController();
const deleteRentalController = new DeleteRentalController();


rentalsRoutes.post("/", checkAuthenticated, createRentalController.handle);
rentalsRoutes.get("/userrental", checkAuthenticated, findRentalByUserIdController.handle);
rentalsRoutes.get("/", checkAuthenticated, checkAdmin, listRentalController.handle);
rentalsRoutes.get("/inprogress", checkAuthenticated, checkAdmin, listRentalsInProgressControllers.handle);
rentalsRoutes.get("/finished", checkAuthenticated, checkAdmin, listFinishedRentalsControllers.handle);
rentalsRoutes.patch("/devolution/:id", checkAuthenticated, checkLandLord, devolutionRentalController.handle);
rentalsRoutes.patch("/update/:id", checkAuthenticated, checkAdmin, updateRentalController.handle)
rentalsRoutes.delete("/delete/:id", checkAuthenticated, checkAdmin, deleteRentalController.handle)


export { rentalsRoutes };
