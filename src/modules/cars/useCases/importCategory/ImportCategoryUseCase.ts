import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
};

@injectable()
class ImportCategoryUseCase{

    private categoriesRepository: ICategoriesRepository;

    constructor(
        @inject("CategoriesRepository")
        categoriesRepository: ICategoriesRepository
        ){
        this.categoriesRepository = categoriesRepository;
    };

    public async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);
        
        await this.createEachCategory(categories);
    };

    private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            const stream = fs.createReadStream(file.path);
        
            const parseFile = csvParse();
        
            stream.pipe(parseFile);
        
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            })
            .on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    };

    private async createEachCategory(categories: IImportCategory[]){
        categories.map(async (category) => {
            const { name, description } = category;
            
            const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
            
            if(!categoryAlreadyExists){
                await this.categoriesRepository.create({name, description});
            };
        });
    };
};

export { ImportCategoryUseCase };