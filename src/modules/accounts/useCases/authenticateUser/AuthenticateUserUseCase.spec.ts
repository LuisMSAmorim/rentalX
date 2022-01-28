import { AppError } from "../../../../errors/AppError";

import { ICreateUserDTO } from "src/modules/DTOs/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
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
       
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate an user with a wrong password", () => {
        expect(async () => {
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

        }).rejects.toBeInstanceOf(AppError);;
    });
});