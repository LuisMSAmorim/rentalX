import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{

    private specifications: Specification[];

    constructor(){
        this.specifications = [];
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