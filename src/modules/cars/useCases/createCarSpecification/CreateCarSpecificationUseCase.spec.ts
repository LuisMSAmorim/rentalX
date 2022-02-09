import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

let carsRepository: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository);
    });

    it("Should be able to add a new specification into a car", async () => {
        expect(async () => {
            const car_id = "12345";
            const specifications_id = ["54321"];
    
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to add a new specification into a non-existent car", async () => {
        const car = await carsRepository.create({
            name: "Car2",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    });
});