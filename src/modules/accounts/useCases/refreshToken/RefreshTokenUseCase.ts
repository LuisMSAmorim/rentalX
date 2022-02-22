import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import auth from "@config/auth";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
};

@injectable()
class RefreshTokenUseCase {

    private usersTokensRepository: IUsersTokensRepository;
    private dateProvider: IDateProvider;

    constructor(
        @inject("UsersTokensRepository")
        usersTokensRepository:
        IUsersTokensRepository,
        @inject("DayjsDateProvider")
        dateProvider: 
        IDateProvider
    ){
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
    };

    public async execute(refresh_token: string): Promise<string> {
        const { email, sub } = verify(refresh_token, auth.secret_refresh_token) as IPayload;
        const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

        const userId = sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(userId, refresh_token);

        if(!userToken){
            throw new AppError("Refresh Token doesnt exists");
        };

        await this.usersTokensRepository.deleteById(userToken.id);

        const newRefreshToken = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token
        });

        const new_refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({
            expiration_date: new_refresh_token_expires_date,
            refresh_token: newRefreshToken,
            user_id: sub
        })

        return newRefreshToken;
    };
};

export { RefreshTokenUseCase };