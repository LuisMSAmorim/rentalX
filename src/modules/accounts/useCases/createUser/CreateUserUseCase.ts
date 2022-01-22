import { inject } from "tsyringe";
import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";

import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";


class CreateUserUseCase {

    private usersRepository: IUsersRepository;

    constructor(
        @inject("UsersRepository")
        usersRepository:
        IUsersRepository){
        this.usersRepository = usersRepository;
    };

    public async execute({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void>{

        await this.usersRepository.create({
            name, 
            username, 
            email, 
            password, 
            driver_license
        });
    };
};

export { CreateUserUseCase };