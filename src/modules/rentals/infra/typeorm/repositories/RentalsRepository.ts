import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {
   
    public async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental> {
        throw new Error("Method not implemented.");
    }

    public async findOpenRentalByCar(car_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    };;

    public async findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    };

};

export { RentalsRepository };