import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { ICreateUserTokenDTO } from "@modules/accounts/DTOs/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

    private usersTokens: UserToken[] = [];

    public async create({ expiration_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            expiration_date,
            refresh_token,
            user_id
        });

        this.usersTokens.push(userToken);

        return userToken;
    };

    public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id && userToken.refresh_token === refresh_token);

        return userToken;
    };

    public async deleteById(id: string): Promise<void> {
        this.usersTokens.filter(userToken => userToken.id != id);
    };

    public async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);

        return userToken;
    };
};

export { UsersTokensRepositoryInMemory };