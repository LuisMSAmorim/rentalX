import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

import { AppError } from "@shared/errors/AppError";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car1",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with existence license plate", async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: "Car1",
                description: "A description",
                daily_rate: 100,
                license_plate: "WSL-1234",
                fine_amount: 60,
                brand: "Test",
                category_id: "testing"
            });
    
            await createCarUseCase.execute({
                name: "Car2",
                description: "A description",
                daily_rate: 100,
                license_plate: "WSL-1234",
                fine_amount: 60,
                brand: "Test",
                category_id: "testing"
            });

        }).rejects.toEqual(new AppError("Car already exists"));
    });

    it("Should be able to create an available car by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car2",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        expect(car.available).toBe(true);
    });
});