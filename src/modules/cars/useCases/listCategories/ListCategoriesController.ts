import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoryUseCase";
 
class ListCategoriesController{

    private listCategoryUseCase: ListCategoriesUseCase;

    constructor(listCategoryUseCase: ListCategoriesUseCase){
        this.listCategoryUseCase = listCategoryUseCase;
    };

    public handle(request: Request, response: Response): Response{
        const categories = this.listCategoryUseCase.execute();

        return response.json(categories);
    };
};

export { ListCategoriesController };