import { Request, Response } from "express";

class RefreshTokenController {

    public async handle(request: Request, response: Response): Promise<Response> {
        
        return response.send();
    };
};

export { RefreshTokenController };