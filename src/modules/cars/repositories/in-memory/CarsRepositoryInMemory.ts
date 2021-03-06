import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    
    cars: Car[] = [];
    
    public async create({ name, description, brand, category_id, daily_rate, fine_amount, license_plate }: ICreateCarDTO): Promise<Car> {
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
        return car;
    };
    
    public async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate);
        
        return car;
    };
    
    public async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const cars = this.cars
        .filter(car => {
            if(car.available === true || ((brand && car.brand == brand) || (category_id && car.category_id == category_id) || (name && car.name == name))){
                return car;
            };
        });
        return cars;
    };

    public async findById(car_id: string): Promise<Car> {
        const car = this.cars.find(car => car.id === car_id);

        return car;
    };

    public async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex(car => car.id === id);

        this.cars[carIndex].available = available;
    };
};

export { CarsRepositoryInMemory };