import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

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

    public async execute(): Promise<Car[]> {
        const cars  = await this.carsRepository.findAvailable();

        return cars;
    };
};

export { ListCarsUseCase };