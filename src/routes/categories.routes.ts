import { Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { ListCategoryController } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return ListCategoryController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single("file"), (request, response) => {
    const { file } = request;
    console.log(file);
    return response.status(200).send();
});

export { categoriesRoutes };