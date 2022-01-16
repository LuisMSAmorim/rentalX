import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoryUseCase";
 
class ListCategoriesController{

    public async handle(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoriesUseCase)

        const categories = await listCategoryUseCase.execute();

        return response.json(categories);
    };
};

export { ListCategoriesController };