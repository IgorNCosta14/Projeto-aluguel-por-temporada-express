import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { FindByNameUseCase } from "./FindUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let findUserUseCase: FindByNameUseCase;

describe("Find User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        findUserUseCase = new FindByNameUseCase(userRepositoryInMemory);
    })

    it("Should be possible to find an user by name", async () => {
        await userRepositoryInMemory.create({name: "user 1",cpf: "616.670.640-53",email: "test@test.com",password: "test"})

        await userRepositoryInMemory.create({name: "user 2",cpf: "873.778.890-63",email: "test2@test.com",password: "test"})


        const user = await findUserUseCase.execute({name: "user 2"})

        expect(user[0].name).toEqual("user 2");
        expect(user[0].cpf).toEqual("873.778.890-63");
    });

    it("Should not be possible to find an user that does not exist", async () => {
        await expect(findUserUseCase.execute({name: "user 2"})).rejects.toEqual(new AppError("No user found with this name!"))
    });
}) 