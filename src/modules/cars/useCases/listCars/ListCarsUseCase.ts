import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
};

@injectable()
class ListCarsUseCase {

    private carsRepository: ICarsRepository;

    constructor(
        @inject("CarsRepository")
        carsRepository: 
        ICarsRepository
    ){
        this.carsRepository = carsRepository;
    };

    public async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const cars  = await this.carsRepository.findAvailable(brand, category_id, name);

        return cars;
    };
};

export { ListCarsUseCase };