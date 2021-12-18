import { Router } from "express";
import { CategoriesRepository } from "../repostiories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const findCategory = categoriesRepository.findByName(name);

    if(findCategory){
        return response.status(400).json({error: 'This name is already in use'});
    };

    categoriesRepository.create({name, description});

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const categories = categoriesRepository.list();

    return response.status(200).json({categories});
});

export { categoriesRoutes };