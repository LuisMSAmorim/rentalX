import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
};

@injectable()
class CreateCarUseCase {

    private carsRepository: ICarsRepository;

    constructor(
        @inject("CarsRepository")
        carsRepository: ICarsRepository
        ){
        this.carsRepository = carsRepository;
    };

    public async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
        await this.verifyIfCarAlreadyExists(license_plate);

        const newCar = await this.createCar({ name, description, daily_rate, license_plate, fine_amount, brand, category_id });

        return newCar;
    };

    private async verifyIfCarAlreadyExists(license_plate: string): Promise<void> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError("Car already exists");
        };
    };

    private async createCar({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
        const newCar = await this.carsRepository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name });

        return newCar;
    };
};

export { CreateCarUseCase };