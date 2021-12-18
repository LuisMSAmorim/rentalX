import { CategoriesRepository } from "../repostiories/CategoriesRepository";
import { ICategoriesRepository } from "../repostiories/ICategoriesRepository";

interface IRequest{
    name: string;
    description: string;
};

class CreateCategoryService{

    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository){
        this.categoriesRepository = categoriesRepository;
    };

    public execute({ name, description }: IRequest): void{
        const findCategory = this.categoriesRepository.findByName(name);

        if(findCategory){
            throw new Error("Name already in use");
        };
    
        this.categoriesRepository.create({name, description});
    };
};

export { CreateCategoryService };