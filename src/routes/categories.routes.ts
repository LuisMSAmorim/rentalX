import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/createCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request, response) => {
    return ListCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single("file"), (request, response) => {
    importCategoryController.handle(request, response);
});

export { categoriesRoutes };