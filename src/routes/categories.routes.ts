import { Router } from "express";
import { Category } from "../model/Category";

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", (request, response) => {
    const { name, description } = request.body;

    const category = new Category();

    Object.assign(category, {
        name,
        description,
        date: new Date()
    });
    
});

export { categoriesRoutes };