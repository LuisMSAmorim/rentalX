

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {

    rentals: Rental[] = [];

    public async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental =  this.rentals.find(rental => rental.car_id === car_id && rental.end_date == null);

        return rental;
    };

    public async findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    };
};