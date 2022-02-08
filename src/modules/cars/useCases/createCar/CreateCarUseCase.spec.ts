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
        await createCarUseCase.execute({
            name: "Car1",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });
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
    
            const teste = await createCarUseCase.execute({
                name: "Car2",
                description: "A description",
                daily_rate: 100,
                license_plate: "WSL-1234",
                fine_amount: 60,
                brand: "Test",
                category_id: "testing"
            });

            console.log(teste);
        }).rejects.toBeInstanceOf(AppError);
    });
});