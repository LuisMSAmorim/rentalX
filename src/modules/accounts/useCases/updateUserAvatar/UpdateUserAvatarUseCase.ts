import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IRequest {
    user_id: string;
    avatar_file: string;
};

@injectable()
class UpdateUserAvatarUseCase {

    private usersRepository: IUsersRepository;

    constructor(
        @inject("UsersRepository")
        usersRepository: 
        IUsersRepository){
        this.usersRepository = usersRepository;
    };

    public async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        const userAlreadyHaveAvatar = user.avatar;

        if(userAlreadyHaveAvatar){
            await this.deleteActualUserAvatar(user);
        };
        
        this.setNewAvatarToUser(user, avatar_file);

        await this.usersRepository.create(user);
    };

    private async deleteActualUserAvatar(user: User): Promise<void> {
        await deleteFile(`./tmp/avatar/${user.avatar}`);
    };

    private setNewAvatarToUser(user: User, avatar_file: string): void {
        user.avatar = avatar_file;
    };
};

export { UpdateUserAvatarUseCase };