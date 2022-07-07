import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase";
import { DeletePropertyUseCase } from "./DeletePropertyUseCase";

let addressRepositoryInMemory: AddressRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let deletePropertyUseCase: DeletePropertyUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        deletePropertyUseCase = new DeletePropertyUseCase(propertiesRepositoryInMemory);
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be possible to delete a property", async () => {

        const user = await createUserUseCase.execute({name: "user name test", cpf: "616.670.640-53", email: "test@test.com", password: "test"});

        const property = await createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: user.id,
            typeProperty: "house",
            dailyRate: 1000,
            propertyNumber: "1",
            zipCode: "49048-450",
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 50
        });

        const propertiesBefore = await propertiesRepositoryInMemory.listAvailableProperty();

        await deletePropertyUseCase.execute({userId: user.id, propertyId: property.id});

        const propertiesAfter = await propertiesRepositoryInMemory.listAvailableProperty();

        expect(propertiesBefore.length).toEqual(1);
        expect(propertiesAfter.length).toEqual(0);
    })

    it("Should not be possible to delete a non-existent property", async () => {
        const user = await createUserUseCase.execute({name: "user name test", cpf: "616.670.640-53", email: "test@test.com", password: "test"});

        await expect(deletePropertyUseCase.execute({userId: user.id, propertyId: "2090a11-f797-43d1-8e5e-1004fc7d58ed"})).rejects.toEqual(new AppError("Property doesn't exist!"));
    })

    it("Should not be possible to delete a property with a logged in user different than the property owner", async () => {
        const user = await createUserUseCase.execute({name: "user name test", cpf: "616.670.640-53", email: "test@test.com", password: "test"});

        const property = await createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: user.id,
            typeProperty: "house",
            dailyRate: 1000,
            propertyNumber: "1",
            zipCode: "49048-450",
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 50
        });

        await expect(deletePropertyUseCase.execute({userId: "2090a11-f797-43d1-8e5e-1004fc7d58ed", propertyId: property.id})).rejects.toEqual(new AppError("User must be the owner of the property to delete it!"));
    })
}) 