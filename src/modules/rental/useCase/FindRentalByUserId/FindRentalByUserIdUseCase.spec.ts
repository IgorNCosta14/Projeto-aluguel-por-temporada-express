import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { FindRentalByUserIdUseCase } from "./FindRentalByUserIdUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let findRentalByUserIdUseCase: FindRentalByUserIdUseCase;
let dateProvider: DateProvider;

describe("Find rental by userId", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)

        findRentalByUserIdUseCase = new FindRentalByUserIdUseCase(rentalsRepositoryInMemory)
    })

    it("Should be possible to find a rental by the user id", async () => {
        const user1 = await createUserUseCase.execute({name: "user 1 name test",cpf: "616.670.640-53",email: "test1@test.com",password: "test"});

        const user2 = await createUserUseCase.execute({name: "user 2 name test",cpf: "917.670.550-13",email: "test2@test.com",password: "test"});

        const property1 = await createPropertyUseCase.execute({
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
            lateFee: 50
        });

        const property2 = await createPropertyUseCase.execute({
            propertyName: "test house 2",
            description: "test",
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

        const property3 = await createPropertyUseCase.execute({
            propertyName: "test house 3",
            description: "test",
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

        const expectedReturnDateProperty1 = dateProvider.addDays(2)
        const expectedReturnDateProperty2 = dateProvider.addDays(3)
        const expectedReturnDateProperty3 = dateProvider.addDays(4)

        await createRentalUseCase.execute({propertyId: property1.id, userId: user1.id, expectedReturnDate: expectedReturnDateProperty1});

        await createRentalUseCase.execute({propertyId: property2.id, userId: user1.id, expectedReturnDate: expectedReturnDateProperty2});

        await createRentalUseCase.execute({propertyId: property3.id, userId: user2.id, expectedReturnDate: expectedReturnDateProperty3});

        const findRentalUser1 = await findRentalByUserIdUseCase.execute(user1.id);
        const findRentalUser2 = await findRentalByUserIdUseCase.execute(user2.id);

        expect(findRentalUser1.length).toEqual(2);
        expect(findRentalUser1[0].propertyId).toEqual(property1.id);
        expect(findRentalUser1[1].propertyId).toEqual(property2.id);
        expect(findRentalUser2.length).toEqual(1);
        expect(findRentalUser2[0].propertyId).toEqual(property3.id);
    })

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)

        findRentalByUserIdUseCase = new FindRentalByUserIdUseCase(rentalsRepositoryInMemory)
    })

    it("Should not be possible to find a rental that does not exist", async () => {
        const user = await createUserUseCase.execute({name: "user 1 name test",cpf: "616.670.640-53",email: "test1@test.com",password: "test"});

        await expect(findRentalByUserIdUseCase.execute(user.id)).rejects.toEqual(new AppError("Rental not found!"));
    })
})