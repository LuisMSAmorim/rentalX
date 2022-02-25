import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string
};

@injectable()
class DevolutionRentalUseCase {

    private rentalsRepository: IRentalsRepository;
    private carsRepository: ICarsRepository;
    private dateProvider: IDateProvider;

    constructor(
    @inject("RentalsRepository")
    rentalsRepository:
    IRentalsRepository,
    @inject("CarsRepository")
    carsRepository:
    ICarsRepository,
    @inject("DateProvider")
    dateProvider: 
    IDateProvider
    ){
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
        this.dateProvider = dateProvider;
    };
    
    public async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.findRental(id);
        const car = await this.carsRepository.findById(rental.car_id);

        const totalValue = this.calculateRentalValue(rental, car);

        this.setRentalEndDate(rental);
        this.setRentalTotalValue(rental, totalValue);

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return rental;
    };

    private async findRental(id: string): Promise<Rental> {
        const rentalExists = await this.rentalsRepository.findById(id);

        if(!rentalExists){
            throw new AppError("Rental doesnt exists");
        };

        return rentalExists;
    };

    private calculateRentalValue(rental: Rental, car: Car): number {
        const rentalDays = this.calculateRentalDays(rental);

        const devolutionDelay = this.calculateDelayInDevolution(rental, car);

        let totalValue = 0;

        if(devolutionDelay > 0){
            const calculate_fine = devolutionDelay * car.fine_amount;
            totalValue = calculate_fine;
        };
        
        totalValue += rentalDays * car.daily_rate;

        return totalValue;
    };

    private calculateRentalDays(rental: Rental): number {
        const minimum_daily = 1;

        let days = this.dateProvider.compareInDays(rental.start_date, "now");

        if(days <= 0){
            days = minimum_daily;
        };

        return days;
    };

    private calculateDelayInDevolution(rental: Rental, car: Car): number {
        const delay = this.dateProvider.compareInDays("now", rental.expected_return_date);

        return delay
    };

    private setRentalEndDate(rental: Rental): void {
        rental.end_date = this.dateProvider.dateNow();
    };

    private setRentalTotalValue(rental: Rental, value: number): void {
        rental.total = value;
    };
};

export { DevolutionRentalUseCase };