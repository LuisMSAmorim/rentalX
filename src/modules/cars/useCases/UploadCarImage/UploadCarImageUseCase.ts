import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImageRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
};

@injectable()
class UploadCarImageUseCase {

    private carsImagesRepository: ICarsImagesRepository;
    
    constructor(
        @inject("CarsImagesRepository")
        carsImagesRepository:
        ICarsImagesRepository
    ){
        this.carsImagesRepository = carsImagesRepository;
    };

    public async execute({ car_id, images_name }: IRequest): Promise<void> {

        this.addImagesToCar({ car_id, images_name });
    };

    private addImagesToCar({car_id, images_name}: IRequest): void {

        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        });
    };
};

export { UploadCarImageUseCase };