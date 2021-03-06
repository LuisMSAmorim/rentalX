import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest{
    name: string;
    description: string;
};

@injectable()
class CreateCategoryUseCase{

    private categoriesRepository: ICategoriesRepository;

    constructor(
        @inject("CategoriesRepository")
        categoriesRepository: ICategoriesRepository
        ){
        this.categoriesRepository = categoriesRepository;
    };

    public async execute({ name, description }: IRequest): Promise<void> {
        await this.verifyIfCategoryNameIsAvailable(name);
    
        await this.categoriesRepository.create({name, description});
    };

    private async verifyIfCategoryNameIsAvailable(name: string): Promise<void> {
        const categoryNameExists = await this.categoriesRepository.findByName(name);

        if(categoryNameExists){
            throw new AppError("Name already in use");
        };
    };
};

export { CreateCategoryUseCase };