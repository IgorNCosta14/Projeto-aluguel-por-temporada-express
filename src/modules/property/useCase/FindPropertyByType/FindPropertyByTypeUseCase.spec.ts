import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase";
import { FindPropertyByTypeUseCase } from "./FindPropertyByTypeUseCase";

let addressRepositoryInMemory: AddressRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let findPropertyByTypeUseCase: FindPropertyByTypeUseCase

describe("Find property by type", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        findPropertyByTypeUseCase = new FindPropertyByTypeUseCase(propertiesRepositoryInMemory);
    })

    it("Should be possible to find properties by type", async () => {

        await createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
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
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
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
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
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

        const propertiesApartment = await findPropertyByTypeUseCase.execute({typeProperty: "apartment"});
        const propertiesHouse = await findPropertyByTypeUseCase.execute({typeProperty: "house"});

        expect(propertiesApartment.length).toEqual(1);
        expect(propertiesApartment[0].typeProperty).toEqual("apartment");
        expect(propertiesHouse.length).toEqual(2);
        expect(propertiesHouse[0].typeProperty).toEqual("house");
        expect(propertiesHouse[1].typeProperty).toEqual("house");
    })
}) 