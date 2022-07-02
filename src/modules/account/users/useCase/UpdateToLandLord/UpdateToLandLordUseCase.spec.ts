import { AppError } from "@shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UpdateToLandLordUseCase } from "./UpdateToLandLordUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let updateToLandLordUseCase: UpdateToLandLordUseCase;

describe("Update user to LandLord", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        updateToLandLordUseCase = new UpdateToLandLordUseCase(userRepositoryInMemory);
    })

    it("Should be possible to update an user to LandLord", async () => {
        const user = await userRepositoryInMemory.create({name: "user 1",cpf: "616.670.640-53",email: "test@test.com",password: "test"});

        await updateToLandLordUseCase.execute(user.id);

        const userLandLord = await userRepositoryInMemory.findById(user.id);

        expect(userLandLord.userPermission).toEqual(2);
    })

    it("Should not be possible to update an user who already is LandLord", async () => {
        const user = await userRepositoryInMemory.create({name: "user 1",cpf: "616.670.640-53",email: "test@test.com",password: "test"});

        await updateToLandLordUseCase.execute(user.id);

        await expect(updateToLandLordUseCase.execute(user.id)).rejects.toEqual(new AppError("User already is landlord or admin!"));
    })
}) 
