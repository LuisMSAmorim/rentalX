import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class ListRentalsByUserUseCase {

    private rentalsRepository: IRentalsRepository;

    constructor(
        @inject("RentalsRepository")
        rentalsRepository:
        IRentalsRepository
    ){  
        this.rentalsRepository = rentalsRepository;
    };

    public async execute(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    };
};

export { ListRentalsByUserUseCase };