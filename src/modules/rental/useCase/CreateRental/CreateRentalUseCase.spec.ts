import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase"
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory"
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory"
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase"
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory"
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;

describe("Create rental", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)
    })

    it("Should be possible to create a rental", async () => {
        const user = await createUserUseCase.execute({name: "user name test",cpf: "616.670.640-53",email: "test@test.com",password: "test"});

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

        const expectedReturnDate = dateProvider.addDays(2)

        const rental = await createRentalUseCase.execute({propertyId: property.id, userId: user.id, expectedReturnDate});

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("expectedTotalRate");
        expect(rental.expectedTotalRate).toBe(2000);
        expect(rental.totalRate).toBe(null);
        expect(rental.totalLateFee).toBe(null);
        expect(rental.endDate).toBe(null);
    })

    it("Should not be possible to create a rental if the property entered is not available", async () => {
        const user = await createUserUseCase.execute({name: "user name test", cpf: "616.670.640-53", email: "test@test.com", password: "test"});

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

        await propertiesRepositoryInMemory.updateAvailableState({ id: property.id, available: false});

        await expect( createRentalUseCase.execute({propertyId: property.id, userId: user.id, expectedReturnDate: new Date("2022-07-13T20:00:00.000Z")})).rejects.toEqual(new AppError("Property not available!"))
    })

    it("Should not be possible to create a rental if the expected return date is less than or equal to the current date", async () => {
        const user = await createUserUseCase.execute({name: "user name test", cpf: "616.670.640-53", email: "test@test.com", password: "test"});

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

        await expect( createRentalUseCase.execute({propertyId: property.id, userId: user.id, expectedReturnDate: new Date()})).rejects.toEqual(new AppError("The return date cannot be less than the current date!"))
    })
}) 
