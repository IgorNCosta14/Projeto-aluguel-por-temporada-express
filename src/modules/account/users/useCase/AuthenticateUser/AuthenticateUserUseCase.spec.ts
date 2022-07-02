import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be possible to authenticate an user", async () => {
        const user = await createUserUseCase.execute({name:"user name test",cpf:"616.670.640-53",email:"test@test.com",password:"test"});

        const userToken = await authenticateUserUseCase.execute({password: "test", email: "test@test.com"});

        expect(userToken).toHaveProperty("token");
        expect(userToken).toHaveProperty("user");
        expect(userToken.user.name).toEqual(user.name);
    })

    it("Should not be possible to authenticate an user with incorrect email", async () => {
        await createUserUseCase.execute({name:"user name test",cpf:"616.670.640-53",email:"test@test.com",password:"test"});

        await expect(authenticateUserUseCase.execute({password: "test", email: "error"})).rejects.toEqual(new AppError("Email or password incorrect"));
    })

    it("Should not be possible to authenticate an user with incorrect password", async () => {
        await createUserUseCase.execute({name:"user name test",cpf:"616.670.640-53",email:"test@test.com",password:"test"});

        await expect(authenticateUserUseCase.execute({password: "error", email: "test"})).rejects.toEqual(new AppError("Email or password incorrect"));
    })
}) 
