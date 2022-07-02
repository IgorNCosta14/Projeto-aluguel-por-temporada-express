import { PermissionsRepositoryInMemory } from "../../repositories/in-memory/PermissionsRepositoryInMemory";
import { ListPermissionsUseCase } from "./ListPermissions.UseCase";

let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
let listPermissionsUseCase: ListPermissionsUseCase;

describe("List permissions", () => {
    beforeEach(() => {
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
        listPermissionsUseCase = new ListPermissionsUseCase(permissionsRepositoryInMemory);
    })

    it("Should be possible to list the permissions", async () => {
        await permissionsRepositoryInMemory.create({name: "nome test", isAdmin: false, isLandlord: false});
        await permissionsRepositoryInMemory.create({name: "nome test 2", isAdmin: false, isLandlord: true});

        const permissions = await listPermissionsUseCase.execute();

        expect(permissions.length).toEqual(2);
        expect(permissions[0].name).toEqual("nome test");
        expect(permissions[1].name).toEqual("nome test 2");
    })
}) 