import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { ListUsersUseCase } from "./ListUsersUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let listUsersUseCase: ListUsersUseCase;

describe("List users", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory);
    })

    it("Should be possible to list users", async () => {
        await userRepositoryInMemory.create({name: "user 1",cpf: "616.670.640-53",email: "test@test.com",password: "test"})

        await userRepositoryInMemory.create({name: "user 2",cpf: "873.778.890-63",email: "test2@test.com",password: "test"})

        const users = await listUsersUseCase.execute()

        expect(users.length).toEqual(2);
        expect(users[0].name).toEqual("user 1");
        expect(users[1].name).toEqual("user 2");
    })
}) 