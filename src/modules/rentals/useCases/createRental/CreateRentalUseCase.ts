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
        @inject("DateProvider")
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

        await this.verifyIfCarIsAvailable(car_id);

        await this.verifyIfUserIsAvailable(user_id);

        this.verifyExpectedReturnDate(expected_return_date);

        const rental = await this.createRental({ car_id, expected_return_date, user_id })

        await this.turnCarUnavailable(car_id);

        return rental;
    };

    private async verifyIfCarIsAvailable(car_id: string): Promise<void> {
        const carHaveACurrentRental = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carHaveACurrentRental){
            throw new AppError("Car isnt available");
        };
    }

    private async verifyIfUserIsAvailable(user_id: string): Promise<void> {
        const userHaveACurrentRental = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(userHaveACurrentRental){
            throw new AppError("User already have an open rental");
        };
    };

    private verifyExpectedReturnDate(expected_return_date: Date): void {
        const rentalMinimumHours = 24;

        const expectedRentalHours = this.dateProvider.compareInHours("now", expected_return_date, );

        if(expectedRentalHours < rentalMinimumHours){
            throw new AppError("Invalid return time (min. 24 hours)");
        };
    };

    private async createRental({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        
        return await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });
    };

    private async turnCarUnavailable(car_id: string): Promise<void> {
        await this.carsRepository.updateAvailable(car_id, false);
    };
};

export { CreateRentalUseCase };