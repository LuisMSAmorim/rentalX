import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

import { AppError } from "@shared/errors/AppError";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvidrr: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvidrr = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvidrr, carsRepositoryInMemory);
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const rental = await createRentalUseCase.execute({
            user_id: "12346",
            car_id: car.id,
            expected_return_date: dayjs().add(1, "day").toDate()
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if user already have a current rental", async () => {
        await expect(async () => {
            const car = await carsRepositoryInMemory.create({
                name: "Car2",
                description: "A description",
                daily_rate: 100,
                license_plate: "WSL-1234",
                fine_amount: 60,
                brand: "Test",
                category_id: "testing"
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
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
            const car = await carsRepositoryInMemory.create({
                name: "Car2",
                description: "A description",
                daily_rate: 100,
                license_plate: "WSL-1234",
                fine_amount: 60,
                brand: "Test",
                category_id: "testing"
            });

            await createRentalUseCase.execute({
                user_id: "879856",
                car_id: car.id,
                expected_return_date: dayjs().add(1, "day").toDate()
            });
            
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: car.id,
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