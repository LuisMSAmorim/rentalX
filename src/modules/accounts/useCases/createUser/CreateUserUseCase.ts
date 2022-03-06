import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";


import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";

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
        
        const [, passwordHash] = await Promise.all([
            this.verifyIfUserExists(email),
            hash(password, 10)
        ])

        await this.usersRepository.create({
            name, 
            email, 
            password: passwordHash, 
            driver_license
        });
    };

    private async verifyIfUserExists(email: string): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists){
            throw new AppError("User already exists");
        };
    };
};

export { CreateUserUseCase };