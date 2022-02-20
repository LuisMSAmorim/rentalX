import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

interface IRequest {
    email: string;
    password: string;
};

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
};

@injectable()
class AuthenticateUserUseCase {
    
    private usersRepository: IUsersRepository;
    private usersTokensRepository: IUsersTokensRepository;

    constructor(
        @inject("UsersRepository")
        usersRepository: 
        IUsersRepository,
        @inject("UsersTokensRepository")
        usersTokensRepository:
        IUsersTokensRepository
        ){
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
    };

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect");
        };

        const comparePassswords = await compare(password, user.password);

        if(!comparePassswords){
            throw new AppError("Email or password incorrect");
        };

        const token = sign({}, "ASDS@SDA21F0,XZasd54aDA/9/64sa2!!!@DSAc", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            user: {
                email: user.email,
                name: user.name
            },
            token
        };

        return tokenReturn;
    };
};

export { AuthenticateUserUseCase };