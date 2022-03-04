import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetUserPasswordController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase);

        await resetUserPasswordUseCase.execute({ password, token: `${token}` });

        return response.send();
    };
};

export { ResetUserPasswordController };