import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

    public async handle(request: Request, response: Response){
        const { user_id, avatar_file } = request.body;

        const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

        await updateUserAvatarUseCase.execute({ user_id, avatar_file });
    };
};

export { UpdateUserAvatarController };