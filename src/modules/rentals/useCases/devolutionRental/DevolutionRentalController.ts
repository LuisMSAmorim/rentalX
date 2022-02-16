import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {

    public async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const { id: user_id } = request.user;
 
        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

        await devolutionRentalUseCase.execute({ id, user_id });
        
        return response.send();
    };
};

export { DevolutionRentalController };