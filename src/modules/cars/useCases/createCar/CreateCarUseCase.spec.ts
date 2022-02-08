import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepository: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Jonh Doe",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });
    });
});