import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { DevolutionRentalUseCase } from "../DevolutionRental/DevolutionRentalUseCase";
import { ListRentalsInProgressUseCase } from "./ListRentalsInProgressUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let listRentalsInProgressUseCase: ListRentalsInProgressUseCase;

describe("List rentals in progress", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider);

        devolutionRentalUseCase = new DevolutionRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)

        listRentalsInProgressUseCase = new ListRentalsInProgressUseCase(rentalsRepositoryInMemory);
    })

    it("Should be possible to list rentals in progress", async () => {
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

        const rental = await createRentalUseCase.execute({propertyId: property3.id, userId: user2.id, expectedReturnDate: expectedReturnDateProperty3});

        const rentalsBefore = await listRentalsInProgressUseCase.execute();

        expect(rentalsBefore.length).toEqual(3);

        await devolutionRentalUseCase.execute(rental.id);

        const rentalsAfter = await listRentalsInProgressUseCase.execute();

        expect(rentalsAfter.length).toEqual(2);
    })
}) 
