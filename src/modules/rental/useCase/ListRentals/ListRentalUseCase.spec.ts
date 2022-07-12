import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { ListRentalUseCase } from "./ListRentalUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;
let listRentalUseCase: ListRentalUseCase;

describe("List rentals", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider);

        listRentalUseCase = new ListRentalUseCase(rentalsRepositoryInMemory);
    })

    it("Should be possible to list all rentals", async () => {
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

        const rentalsBefore = await listRentalUseCase.execute();
        
        expect(rentalsBefore.length).toEqual(0);

        await createRentalUseCase.execute({propertyId: property.id, userId: user.id, expectedReturnDate});

        const rentalsAfter = await listRentalUseCase.execute();

        expect(rentalsAfter.length).toEqual(1);
    })
}) 
