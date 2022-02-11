import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
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

    constructor(
        @inject("RentalsRepository")
        rentalsRepository:
        RentalsRepository
    ){
        this.rentalsRepository = rentalsRepository;
    };

    public async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnavailable){
            throw new AppError("Car isnt available");
        };

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser){
            throw new AppError("User already have an open rental");
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