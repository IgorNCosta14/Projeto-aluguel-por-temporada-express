import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be possible to create an user", async () => {
        const user = await createUserUseCase.execute({name: "user name test",cpf: "616.670.640-53",email: "test@test.com",password: "test"});

        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("createdAt");
        expect(user.activeUser).toEqual(true);
        expect(user.userPermission).toEqual(1);
    })

    it("Should be possible to create an user if the email is invalid", async () => {
        await expect(createUserUseCase.execute({name: "user name test",cpf: "616.670.640-53",email: "error",password: "test"})).rejects.toEqual(new AppError("Invalid email!"))
    })

    it("it should be possible to create an user if the email is already in use", async () => {
        await createUserUseCase.execute({name: "user name test",cpf: "873.778.890-63",email: "test@test.com",password: "test"})

        await expect(createUserUseCase.execute({name: "user name test",cpf: "616.670.640-53",email: "test@test.com",password: "test"})).rejects.toEqual(new AppError("Email already in use!"))
    })

    it("Should be possible to create an user if the cpf is invalid", async () => {
        await expect(createUserUseCase.execute({name: "user name test",cpf: "error",email: "test@test.com",password: "test"})).rejects.toEqual(new AppError("Invalid cpf!"))
    })

    it("should be possible to create an user if the cpf is already in use", async () => {
        await createUserUseCase.execute({name: "user name test",cpf: "873.778.890-63",email: "test@test.com",password: "test"})

        await expect(createUserUseCase.execute({name: "user name test",cpf: "873.778.890-63",email: "test2@test.com",password: "test"})).rejects.toEqual(new AppError("CPF already registered!"))
    })
})