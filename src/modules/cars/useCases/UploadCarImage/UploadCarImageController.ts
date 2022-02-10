import { Request, Response } from "express";
import { container } from "tsyringe";

interface IFiles {
    filename: string;
};

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

class UploadCarImagesController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_name = images.map(file => file.filename);

        await uploadCarImageUseCase.execute({ car_id: id, images_name });

        return response.status(201).send();
    };
};

export { UploadCarImagesController };