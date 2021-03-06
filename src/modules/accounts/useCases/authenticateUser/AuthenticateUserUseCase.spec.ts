import { AppError } from "@shared/errors/AppError";

import { ICreateUserDTO } from "@modules/accounts/DTOs/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepository, dateProvider);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "test@email.com",
            name: "Jon Doe",
            password: "qwerty"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({ 
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a non-existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({ 
                email: "nonexistent@email.com",
                password: "aWeakPasswordHere"
            });
       
        }).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("Should not be able to authenticate an user with a wrong password", async () => {
        await expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000123",
                email: "test@email.com",
                name: "Jon Doe",
                password: "qwerty"
            };
    
            await createUserUseCase.execute(user);
    
            await authenticateUserUseCase.execute({ 
                email: user.email,
                password: "wrongPassword"
            });

        }).rejects.toEqual(new AppError("Email or password incorrect"));;
    });
});