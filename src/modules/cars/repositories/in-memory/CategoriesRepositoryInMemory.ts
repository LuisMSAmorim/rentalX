import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

    categories: Category[] = [];

    constructor(){

    };

    create({ name, description }: ICreateCategoryDTO): Promise<void> {
        
    };

    findByName(name: string): Promise<Category> {
        
    };

    list(): Promise<Category[]> {
        
    };
};