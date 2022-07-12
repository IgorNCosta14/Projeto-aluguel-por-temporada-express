import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;
let devolutionRentalUseCase: DevolutionRentalUseCase;

describe("", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)

        devolutionRentalUseCase = new DevolutionRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)
    })

    it("Should be possible to return a rent", async () => {
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

        const rentalFinished = await devolutionRentalUseCase.execute(rental.id);

        console.log(rentalFinished)

        expect(rentalFinished.expectedTotalRate).toBe(2000);
        expect(rentalFinished.totalRate).toBe(2000);
        expect(rentalFinished.totalLateFee).toBe(null);
    })

    it("Should not be possible to finalize a rental that has already ended", async () => {
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

        await devolutionRentalUseCase.execute(rental.id)

        await expect(devolutionRentalUseCase.execute(rental.id)).rejects.toEqual(new AppError("Rent already finished!"));
    })
})