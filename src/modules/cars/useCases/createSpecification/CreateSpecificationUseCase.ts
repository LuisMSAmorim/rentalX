import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
};

class CreateSpecificationUseCase{

    private specificationsRepository: ISpecificationsRepository;

    constructor(createSpecifictionsRepository: ISpecificationsRepository){
        this.specificationsRepository = createSpecifictionsRepository;
    };

    public execute({name, description}: IRequest): void{
        const findSpecification = this.specificationsRepository.findByName(name);

        if(findSpecification){
            throw new Error("Name already in use");
        };
    
        this.specificationsRepository.create({name, description});
    };
};

export { CreateSpecificationUseCase };