import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory"
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory"
import { CreatePropertyUseCase } from "../CreateProperty/CreatePropertyUseCase"
import { UpdatePropertyUseCase } from "./UpdatePropertyUseCase"

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let updatePropertyUseCase: UpdatePropertyUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Update property", () => {
    beforeEach(() => {
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        updatePropertyUseCase = new UpdatePropertyUseCase(propertiesRepositoryInMemory)
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
    })

    it("Should be possible to update a property", async () => {

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

        await updatePropertyUseCase.execute({id: property.id, propertyName: "updatedName", description: "updatedDescription", propertyNumber: "updatedNumber", typeProperty: "updatedType", dailyRate: 1 , propertyOwner: user.id, lateFee: 2});

        const propertyUpdated = await propertiesRepositoryInMemory.findById(property.id)

        console.log(await propertiesRepositoryInMemory.listAvailableProperty())

        expect(propertyUpdated.id).toEqual(property.id);
    })
}) 