import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import auth from "@config/auth";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

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
    refresh_token: string;
};

@injectable()
class AuthenticateUserUseCase {
    
    private usersRepository: IUsersRepository;
    private usersTokensRepository: IUsersTokensRepository;
    private dateProvider: IDateProvider;

    constructor(
        @inject("UsersRepository")
        usersRepository: 
        IUsersRepository,
        @inject("UsersTokensRepository")
        usersTokensRepository:
        IUsersTokensRepository,
        @inject("DateProvider")
        dateProvider: 
        IDateProvider
        ){
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    };

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.getUser(email);

        await this.verifyUserPassword(password, user);

        const token = await this.createUserToken(user);

        const refresh_token = await this.createUserRefreshToken(user);

        const refresh_token_expiration_date = this.setRefreshTokenExpirationDate();

        await this.usersTokensRepository.create({ 
            expiration_date: refresh_token_expiration_date,
            refresh_token,
            user_id: user.id
         });

        const tokenReturn: IResponse = {
            user: {
                email: user.email,
                name: user.name
            },
            token,
            refresh_token
        };

        return tokenReturn;
    };

    private async getUser(email: string): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(email);

        if(!userExists){
            throw new AppError("Email or password incorrect");
        };

        return userExists;
    };

    private async verifyUserPassword(password: string, user: User): Promise<void> {
        const passwordIsCorrect = await compare(password, user.password);

        if(!passwordIsCorrect){
            throw new AppError("Email or password incorrect");
        };
    };

    private async createUserToken(user: User): Promise<string> {
        const { secret_token, expires_in_token } = auth;

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        return token;
    };

    private async createUserRefreshToken(user: User): Promise<string> {
        const { secret_refresh_token, expires_in_refresh_token } = auth;

        const refresh_token = sign({ email: user.email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });
        
        return refresh_token;
    };

    private setRefreshTokenExpirationDate(): Date {
        const { expires_refresh_token_days } = auth;

        return this.dateProvider.addDays(expires_refresh_token_days);
    };
};

export { AuthenticateUserUseCase };