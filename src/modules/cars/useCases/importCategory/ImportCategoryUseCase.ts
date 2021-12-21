import fs from "fs";
import { parse as csvParse } from "csv-parse";

import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IImportCategory{
    name: string;
    description: string;
};

class ImportCategoryUseCase{

    private categoriesRepository: ICategoriesRepository;

    constructor(categoriesRepository: ICategoriesRepository){
        this.categoriesRepository = categoriesRepository;
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

    public async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const findCategory = this.categoriesRepository.findByName(name);

            if(!findCategory){
                this.categoriesRepository.create({name, description});
            };
        });
    };
};

export { ImportCategoryUseCase };