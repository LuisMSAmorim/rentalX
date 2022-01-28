import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "../../../../errors/AppError";

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
        
        console.log(categoryCreated);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with existent name", async () => {
        
        expect(async () => {    
            const category = {
                name: "Category Test",
                description: "Description Test"
            };
    
            await createCategoryUseCase.execute(category);
    
            await createCategoryUseCase.execute(category);
           
        }).rejects.toBeInstanceOf(AppError);
    });

});