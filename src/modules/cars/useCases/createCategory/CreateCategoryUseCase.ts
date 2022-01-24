import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
        const findCategory = await this.categoriesRepository.findByName(name);

        if(findCategory){
            throw new Error("Name already in use");
        };
    
        await this.categoriesRepository.create({name, description});
    };
};

export { CreateCategoryUseCase };