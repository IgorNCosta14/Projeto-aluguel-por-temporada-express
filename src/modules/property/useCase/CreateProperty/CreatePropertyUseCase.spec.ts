import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory"
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory"
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
        const property = await createPropertyUseCase.execute({propertyName: "test house",
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
            lateFee: 50,})

            console.log(property)

        expect(property).toHaveProperty("id")
    })
}) 
