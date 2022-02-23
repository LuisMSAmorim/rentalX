import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendRecoveryPasswordEmailUseCase } from "./SendRecoveryPasswordEmailUseCase";

class SendRecoveryPasswordEmailController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendRecoveryPasswordEmailUseCase = container.resolve(SendRecoveryPasswordEmailUseCase);

        await sendRecoveryPasswordEmailUseCase.execute(email);

        return response.send();
    };
};

export { SendRecoveryPasswordEmailController };