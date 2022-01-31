import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

@injectable()
class ListCategoriesUseCase{

    private categoriesRepository: ICategoriesRepository;

    constructor(
        @inject("CategoriesRepository")
        categoriesRepository: ICategoriesRepository
        ){
        this.categoriesRepository = categoriesRepository;
    };

    public async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();

        return categories;
    };
};

export { ListCategoriesUseCase };