import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase";
import { FindPropertyByOwnerUseCase } from "./FindPropertyByOwnerUseCase";

let addressRepositoryInMemory: AddressRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let findPropertyByOwnerUseCase: FindPropertyByOwnerUseCase

describe("Find property by owner", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        findPropertyByOwnerUseCase = new FindPropertyByOwnerUseCase(propertiesRepositoryInMemory);
    })

    it("Should be possible to find properties by owner", async () => {
        const idOwner1 = "32090a11-f797-43d1-8e5e-1004fc7d58ed";
        const idOwner2 = "3bf785c8-126d-436e-b85b-19ebcf26aaaf";

        await createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: idOwner1,
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

        await createPropertyUseCase.execute({
            propertyName: "test house 2",
            description: "test",
            propertyOwner: idOwner1,
            typeProperty: "house",
            dailyRate: 1500,
            propertyNumber: "2",
            zipCode: "49048-450",
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 45
        });

        await createPropertyUseCase.execute({
            propertyName: "test apartment 1",
            description: "test",
            propertyOwner: idOwner2,
            typeProperty: "apartment",
            dailyRate: 2000,
            propertyNumber: "3",
            zipCode: "89057-490",
            country: "Brazil", 
            state: "SC", 
            city: "Blumenau", 
            street: "Rua Renato de Ávila",
            lateFee: 30
        });

        const propertiesOwner1 = await findPropertyByOwnerUseCase.execute(idOwner1);
        const propertiesOwner2 = await findPropertyByOwnerUseCase.execute(idOwner2);

        expect(propertiesOwner1.length).toEqual(2);
        expect(propertiesOwner1[0].propertyOwner).toEqual(idOwner1);
        expect(propertiesOwner1[1].propertyOwner).toEqual(idOwner1);
        expect(propertiesOwner2.length).toEqual(1);
        expect(propertiesOwner2[0].propertyOwner).toEqual(idOwner2);
    })
}) 