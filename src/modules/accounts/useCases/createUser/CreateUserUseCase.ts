import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";

@injectable()
class CreateUserUseCase {

    private usersRepository: IUsersRepository;

    constructor(
        @inject("UsersRepository")
        usersRepository:
        IUsersRepository){
        this.usersRepository = usersRepository;
    };

    public async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void>{
        const passwordHash = await hash(password, 10);

        await this.usersRepository.create({
            name, 
            email, 
            password: passwordHash, 
            driver_license
        });
    };
};

export { CreateUserUseCase };