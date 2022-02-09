import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
};

@injectable()
class CreateCarSpecificationUseCase {

    private carsRepository: ICarsRepository;

    constructor(
        @inject("CarsRepository")
        carsRepository:
        ICarsRepository
    ){
        this.carsRepository = carsRepository;
    };

    public async execute({ car_id, specifications_id }: IRequest): Promise<void> {
        const car = this.carsRepository.findById(car_id);

        if(!car){
            throw new AppError("Car doesnt exists");
        };
    };
};

export { CreateCarSpecificationUseCase };