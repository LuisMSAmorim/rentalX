import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../../DTOs/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    
    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    };

    public async create({ name, driver_license, email, password }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            driver_license,
            email,
            password
        });

        await this.repository.save(user);

        return;
    };

    public async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});

        return user;
    };

    public async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user;
    };
};

export { UsersRepository };