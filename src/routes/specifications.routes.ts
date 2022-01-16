import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const SpecificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationsRoutes.post("/", createSpecificationController.handle);

// SpecificationsRoutes.get("/", (request, response) => {
//     const Specifications = specificationsRepository.list();

//     return response.status(200).json({Specifications});
// });

export { SpecificationsRoutes };