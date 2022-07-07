import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase";
import { ListPropertyUseCase } from "./ListPropertyUseCase";

let listPropertyUseCase: ListPropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let createPropertyUseCase: CreatePropertyUseCase;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;

describe("List properties", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        listPropertyUseCase = new ListPropertyUseCase(propertiesRepositoryInMemory);
    })

    it("Should be possible to list addresses", async () => {
        const addressesBefore = await listPropertyUseCase.execute();

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
            description: "test 2",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
            typeProperty: "house",
            dailyRate: 1000,
            propertyNumber: "2",
            zipCode: "49048-450",
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 50
        });

        const addressesAfter = await listPropertyUseCase.execute();

        expect(addressesBefore.length).toEqual(0);
        expect(addressesAfter.length).toEqual(2);
    })
}) 
