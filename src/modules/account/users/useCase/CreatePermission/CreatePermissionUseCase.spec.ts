import { AppError } from "@shared/errors/AppError";
import { PermissionsRepositoryInMemory } from "../../repositories/in-memory/PermissionsRepositoryInMemory"
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
let createPermissionUseCase: CreatePermissionUseCase;

describe("Create permission", () => {
    beforeEach(() => {
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory()
        createPermissionUseCase = new CreatePermissionUseCase(permissionsRepositoryInMemory)
    })

    it("Should be possible to create a permission", async () => {
        const permission = await createPermissionUseCase.execute({name: "nome test", isAdmin: false, isLandlord: false})

        expect(permission).toHaveProperty("id");
        expect(permission).toHaveProperty("createdAt");
    })

    it("Should not be possible to create a permission with a name already in use", async () => {
        await createPermissionUseCase.execute({name: "nome test", isAdmin: false, isLandlord: false})

        await expect(createPermissionUseCase.execute({name: "nome test", isAdmin: false, isLandlord: false})).rejects.toEqual(new AppError("Permission name already in use!"));
    })
}) 