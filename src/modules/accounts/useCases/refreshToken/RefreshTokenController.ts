import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { refresh_token } = request.body || request.headers["x-acess-token"] || request.query;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const newRefreshToken = await refreshTokenUseCase.execute(refresh_token);

        return response.json({ newRefreshToken });
    };
};

export { RefreshTokenController };