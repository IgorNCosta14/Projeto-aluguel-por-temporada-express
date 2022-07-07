import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory"
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreatePropertyUseCase } from "./CreatePropertyUseCase"

let createPropertyUseCase: CreatePropertyUseCase
let addressRepositoryInMemory: AddressRepositoryInMemory
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory


describe("Create property", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        
    })

    it("Should be possible to create a property", async () => {
        const property = await createPropertyUseCase.execute({
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

        expect(property).toHaveProperty("id");
        expect(property.available).toEqual(true);
    })

    it("Should not be possible to create a property if dailyRate is less than or equal to zero", async () => {
        await expect(createPropertyUseCase.execute({
            propertyName: "test house",
            description: "test",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
            typeProperty: "house",
            dailyRate: 0,
            propertyNumber: "1",
            zipCode: "49048-450",
            country: "Brazil", 
            state: "SE", 
            city: "Aracaju", 
            street: "Rua Radialista Cadmo Nascimento",
            lateFee: 50
        })).rejects.toEqual(new AppError("Daily rate must be greater than zero!"));
    })

    it("Should not register the same zip code twice", async () => {
        await createPropertyUseCase.execute({
            propertyName: "test house 1",
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
            lateFee: 25
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
            lateFee: 50
        });

        await createPropertyUseCase.execute({
            propertyName: "test house 3",
            description: "test",
            propertyOwner: "32090a11-f797-43d1-8e5e-1004fc7d58ed",
            typeProperty: "house",
            dailyRate: 2000,
            propertyNumber: "3",
            zipCode: "89057-490",
            country: "Brazil", 
            state: "SC", 
            city: "Blumenau", 
            street: "Rua Renato de Ávila",
            lateFee: 30
        });

        const addresses = await addressRepositoryInMemory.findAll();

        expect(addresses.length).toEqual(2);
    })
})