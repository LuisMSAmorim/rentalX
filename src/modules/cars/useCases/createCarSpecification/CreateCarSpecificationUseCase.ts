import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    specifications_id: string[];
};

@injectable()
class CreateCarSpecificationUseCase {

    private carsRepository: ICarsRepository;
    private specificationsRepository: ISpecificationsRepository;

    constructor(
        @inject("CarsRepository")
        carsRepository:
        ICarsRepository,
        @inject("SpecificationsRepository")
        specificationsRepository:
        ISpecificationsRepository
    ){
        this.carsRepository = carsRepository;
        this.specificationsRepository = specificationsRepository;
    };

    public async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const car = await this.findCar(car_id);

        const specifications = await this.specificationsRepository.findByIds(specifications_id); 
        
        car.specifications = specifications;

        await this.carsRepository.create(car);

        return car;
    };

    private async findCar(car_id: string): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if(!carExists){
            throw new AppError("Car doesnt exists");
        };

        return carExists;
    };
};

export { CreateCarSpecificationUseCase };