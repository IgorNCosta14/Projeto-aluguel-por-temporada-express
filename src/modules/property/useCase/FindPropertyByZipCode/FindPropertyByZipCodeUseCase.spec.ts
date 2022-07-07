import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase";
import { FindPropertyByZipCodeUseCase } from "./FindPropertyByZipCodeUseCase";

let addressRepositoryInMemory: AddressRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let findPropertyByZipCodeUseCase: FindPropertyByZipCodeUseCase;

describe("Find property by zip code", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        findPropertyByZipCodeUseCase = new FindPropertyByZipCodeUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
    })

    it("Should be possible to find properties by the zip code", async () => {
        const zipCode1 = "49048-450";
        const zipCode2 = "89057-490";

        await createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
            typeProperty: "house",
            dailyRate: 1000,
            propertyNumber: "1",
            zipCode: zipCode1,
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
            zipCode: zipCode1,
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 45
        });

        await createPropertyUseCase.execute({
            propertyName: "test house 3",
            description: "test",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
            typeProperty: "house",
            dailyRate: 2000,
            propertyNumber: "3",
            zipCode: zipCode2,
            country: "Brazil", 
            state: "SC", 
            city: "Blumenau", 
            street: "Rua Renato de Ávila",
            lateFee: 30
        });

        const propertiesTest1 = await findPropertyByZipCodeUseCase.execute(zipCode1);

        const propertiesTest2 = await findPropertyByZipCodeUseCase.execute(zipCode2);

        expect(propertiesTest1.length).toEqual(2);
        expect(propertiesTest2.length).toEqual(1);
    })
}) 