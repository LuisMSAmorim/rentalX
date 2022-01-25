import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
};

@injectable()
class CreateSpecificationUseCase{

    private specificationsRepository: ISpecificationsRepository;

    constructor(
        @inject("SpecificationsRepository")
        createSpecifictionsRepository: ISpecificationsRepository
        ){
        this.specificationsRepository = createSpecifictionsRepository;
    };

    public async execute({ name, description }: IRequest): Promise<void> {
        const findSpecification = await this.specificationsRepository.findByName(name);

        if(findSpecification){
            throw new AppError("Name already in use");
        };
    
        await this.specificationsRepository.create({name, description});
    };
};

export { CreateSpecificationUseCase };