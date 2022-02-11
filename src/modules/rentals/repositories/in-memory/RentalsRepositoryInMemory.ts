import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    
    rentals: Rental[] = [];

    public async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date()
        });

        this.rentals.push(rental);

        return rental;
    };

    public async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental =  this.rentals.find(rental => rental.car_id === car_id && rental.end_date == null);

        return rental;
    };

    public async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental =  this.rentals.find(rental => rental.user_id === user_id && rental.end_date == null);

        return rental;   
    };
};

export { RentalsRepositoryInMemory };