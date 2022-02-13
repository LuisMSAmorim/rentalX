import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvidr: DayjsDateProvider;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvidr = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvidr);
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12346",
            car_id: "1212123",
            expected_return_date: dayjs().add(1, "day").toDate()
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if user already have a current rental", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212123",
                expected_return_date: dayjs().add(1, "day").toDate()
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "468163",
                expected_return_date: dayjs().add(1, "day").toDate()
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if car is currently rented", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "879856",
                car_id: "1212123",
                expected_return_date: dayjs().add(1, "day").toDate()
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "1212123",
                expected_return_date: dayjs().add(1, "day").toDate()
            });

        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not able to create a rental with a invalid return time (less then 24 hours)", async () => {
        await expect(async () => {
                await createRentalUseCase.execute({
                    user_id: "879856",
                    car_id: "1212123",
                    expected_return_date: dayjs().add(23, "hours").toDate()
                });
        }).rejects.toBeInstanceOf(AppError);
    });
});