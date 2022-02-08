import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];
   
    public async create({ name, description, brand, category_id, daily_rate, fine_amount, license_plate }: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            brand,
            category_id, 
            daily_rate,
            fine_amount,
            license_plate
        });

        this.cars.push(car);
    };

    public async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate);

        return car;
    };
};

export { CarsRepositoryInMemory };