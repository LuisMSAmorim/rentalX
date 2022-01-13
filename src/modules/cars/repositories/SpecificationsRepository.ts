import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./implementations/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{

    private specifications: Specification[];

    private static INSTANCE: SpecificationsRepository;

    private constructor(){
        this.specifications = [];
    };

    public static getInstance(){
        if(!SpecificationsRepository.INSTANCE){
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        };
        return SpecificationsRepository.INSTANCE;
    };

    public create({description, name}: ICreateSpecificationDTO): void{
        const specification = new Specification();
        
        Object.assign(specification, {
            name, 
            description
        });

        this.specifications.push(specification);
    };

    public list(){
        return this.specifications;
    };

    public findByName(name: string): Specification{
        const specification = this.specifications.find(category => specification.name === name);
        return specification
    };
};

export { SpecificationsRepository };