import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { DeactivatingUserUseCase } from "./DeactivatingUserUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let deactivatingUserUseCase: DeactivatingUserUseCase;

describe("Deactivate user", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        deactivatingUserUseCase = new DeactivatingUserUseCase(userRepositoryInMemory);

    })

    it("Should be possible to Deactivate an user", async () => {
        const user = await userRepositoryInMemory.create({name: "user name test",cpf: "616.670.640-53",email: "test@test.com",password: "test"});

        await deactivatingUserUseCase.execute(user.id);

        const deactivatedUser = await userRepositoryInMemory.findById(user.id);

        expect(deactivatedUser.activeUser).toEqual(false);
    })

    it("Should not be possible to deactivate an user that does not exist", async () => {
        const id = "error"
        await expect(deactivatingUserUseCase.execute(id)).rejects.toEqual(new AppError("User not found!"));
    })
})