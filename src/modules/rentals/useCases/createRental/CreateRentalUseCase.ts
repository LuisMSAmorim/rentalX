import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {

    private rentalsRepository: IRentalsRepository;
    private dateProvider: IDateProvider;
    private carsRepository: ICarsRepository;

    constructor(
        @inject("RentalsRepository")
        rentalsRepository:
        IRentalsRepository,
        @inject("DayjsDateProvider")
        dateProvider: 
        IDateProvider,
        @inject("CarsRepository")
        carsRepository:
        ICarsRepository
    ){
        this.rentalsRepository = rentalsRepository;
        this.dateProvider = dateProvider;
        this.carsRepository = carsRepository;
    };

    public async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        const minHours = 24;
        
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car isnt available");
        };

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("User already have an open rental");
        };

        const compare = this.dateProvider.compareInHours("now", expected_return_date, );

        if(compare < minHours){
            throw new AppError("Invalid return time (min. 24 hours)");
        };

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    };
};

export { CreateRentalUseCase };