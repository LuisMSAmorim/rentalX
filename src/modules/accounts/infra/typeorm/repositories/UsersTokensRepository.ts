import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/DTOs/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserToken>;

    constructor(){
        this.repository = getRepository(UserToken);
    };

    public async create({ expiration_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            expiration_date,
            refresh_token,
            user_id
        });

        await this.repository.save(userToken);

        return userToken;
    };

    public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: {
                user_id,
                refresh_token
            }
        });
        
        return userToken;
    };

    public async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);  
    };
};

export { UsersTokensRepository };