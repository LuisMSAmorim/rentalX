import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const cars = await listCarsUseCase.execute({ brand: car.brand });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const cars = await listCarsUseCase.execute({ name: car.name });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "A description",
            daily_rate: 100,
            license_plate: "WSL-1234",
            fine_amount: 60,
            brand: "Test",
            category_id: "testing"
        });

        const cars = await listCarsUseCase.execute({ category_id: car.category_id });

        expect(cars).toEqual([car]);
    });
});