import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
};

@injectable()
class CreateRentalUseCase {

    private rentalsRepository: IRentalsRepository;

    constructor(
        @inject("RentalsRepository")
        rentalsRepository:
        RentalsRepository
    ){
        this.rentalsRepository = rentalsRepository;
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

        const expected_return_dateFormat = dayjs(expected_return_date).utc().local().format()
        const dateNow = dayjs.utc().local().format();

        const compare = dayjs(expected_return_dateFormat).diff(dateNow, "hours");

        if(compare < minHours){
            throw new AppError("Invalid return time (min. 24 hours)");
        };

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    };
};

export { CreateRentalUseCase };