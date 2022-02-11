import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

import { AppError } from "@shared/errors/AppError";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12346",
            car_id: "1212123",
            expected_return_date: new Date()
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if user already have a current rental", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212123",
                expected_return_date: new Date()
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212123",
                expected_return_date: new Date()
            });

        }).rejects.toBeInstanceOf(AppError);
    });
});