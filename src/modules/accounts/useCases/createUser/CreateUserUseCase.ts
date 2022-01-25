import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

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
        const verifyUser = await this.usersRepository.findByEmail(email);

        if(verifyUser){
            throw new AppError("User already exists");
        };

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