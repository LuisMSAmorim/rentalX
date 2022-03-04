import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
};

@injectable()
class ResetUserPasswordUseCase {

    private usersTokensRepository: IUsersTokensRepository;
    private dateProvider: IDateProvider;
    private usersRepository: IUsersRepository;

    constructor(
        @inject("UsersTokensRepository")
        usersTokensRepository:
        IUsersTokensRepository,
        @inject("DateProvider")
        dateProvider:
        IDateProvider,
        @inject("UsersRepository")
        usersRepository:
        IUsersRepository
    ){
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
        this.usersRepository = usersRepository;
    };

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.findUserToken(token);

        this.verifyIfTokenIsValid(userToken);

        const userId = userToken.user_id;
        
        await this.changeUserPassword(userId, password);

        await this.deleteUsedToken(userToken.id);
    };

    private async findUserToken(token: string): Promise<UserToken> {
        const userTokenExists = await this.usersTokensRepository.findByRefreshToken(token);

        if(!userTokenExists){
            throw new AppError("Invalid Token");
        };

        return userTokenExists;
    };

    private verifyIfTokenIsValid(userToken: UserToken): void {
        const tokenIsValid = this.dateProvider.verifyIfStartDateIsBeforeThanEndDate(userToken.expiration_date, this.dateProvider.dateNow());

        if(!tokenIsValid){
            throw new AppError("Invalid Token");
        };
    };

    private async changeUserPassword(userId: string, newPassword: string): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        const passwordHash = await hash(newPassword, 8);

        user.password = passwordHash;

        await this.usersRepository.create(user);
    };

    private async deleteUsedToken(tokenId: string): Promise<void> {
        await this.usersTokensRepository.deleteById(tokenId);
    };
};

export { ResetUserPasswordUseCase };