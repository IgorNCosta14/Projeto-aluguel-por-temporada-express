import { Router } from "express";
import { authenticateUserRoutes } from "./authenticateUser.routes";
import { propertyRoutes } from "./property.routes";
import { rentalsRoutes } from "./rental.routes";
import { usersRoutes } from "./user.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/properties", propertyRoutes);
router.use("/rentals", rentalsRoutes);
router.use(authenticateUserRoutes);

export { router };
