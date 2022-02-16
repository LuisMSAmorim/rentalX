import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    rental_id: string;
};

@injectable()
class DevolutionRentalUseCase {

    private rentalsRepository: IRentalsRepository;
    private carsRepository: ICarsRepository;

    constructor(
    @inject("RentalsRepository")
    rentalsRepository:
    IRentalsRepository,
    @inject("CarsRepository")
    carsRepository:
    ICarsRepository
    ){
        this.rentalsRepository = rentalsRepository;
        this.carsRepository = carsRepository;
    };
    
    public async execute({ car_id, rental_id }: IRequest){
        const rental = await this.rentalsRepository.findById(rental_id);

        if(!rental){
            throw new AppError("Rental doesnt exists");
        };

        await this.carsRepository.updateAvailable(car_id, true);
    };
};

export { DevolutionRentalUseCase };