import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

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
    @inject("DayjsDateProvider")
    dateProvider: 
    IDateProvider
    ){
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
        this.dateProvider = dateProvider;
    };
    
    public async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id);
        const minimum_daily = 1;

        if(!rental){
            throw new AppError("Rental doesnt exists");
        };

        let daily = this.dateProvider.compareInDays(rental.start_date, "now");

        if(daily <= 0){
            daily = minimum_daily;
        };
        
        const delay = this.dateProvider.compareInDays("now", rental.expected_return_date);

        let total = 0;

        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        };

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return rental;
    };
};

export { DevolutionRentalUseCase };