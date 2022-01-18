import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const SpecificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
 

SpecificationsRoutes.post("/", createSpecificationController.handle);

// SpecificationsRoutes.get("/");

export { SpecificationsRoutes };