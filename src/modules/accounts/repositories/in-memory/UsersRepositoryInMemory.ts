import { ICreateUserDTO } from "src/modules/DTOs/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {

    users: User[] = [];
    
    public async create({ name, driver_license, email, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            driver_license,
            email,
            password,
        });

        this.users.push(user);
    };

    public async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);

        return user;
    };

    public async findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);

        return user;
    };
};

export { UsersRepositoryInMemory };
