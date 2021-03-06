import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Description Test"
        };

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        
        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with existent name", async () => {
        
        await expect(async () => {    
            const category = {
                name: "Category Test",
                description: "Description Test"
            };
    
            await createCategoryUseCase.execute(category);
    
            await createCategoryUseCase.execute(category);
           
        }).rejects.toEqual(new AppError("Name already in use"));
    });

});