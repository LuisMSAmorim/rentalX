import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const SpecificationsRoutes = Router();

SpecificationsRoutes.post("/", (request, response) => {
   return createSpecificationController.handle(request, response);
});

// SpecificationsRoutes.get("/", (request, response) => {
//     const Specifications = specificationsRepository.list();

//     return response.status(200).json({Specifications});
// });

export { SpecificationsRoutes };