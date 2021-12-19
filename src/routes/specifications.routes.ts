import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

const SpecificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

SpecificationsRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createspecificationService = new CreateSpecificationService(specificationsRepository);

    createspecificationService.execute({ name, description });

    return response.status(201).send();
});

SpecificationsRoutes.get("/", (request, response) => {
    const Specifications = specificationsRepository.list();

    return response.status(200).json({Specifications});
});

export { SpecificationsRoutes };