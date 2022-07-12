import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { UpdateRentalUseCase } from "./UpdateRentalUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;
let updateRentalUseCase: UpdateRentalUseCase;

describe("Update rental", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);

        dateProvider = new DateProvider()
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider)

        updateRentalUseCase = new UpdateRentalUseCase(rentalsRepositoryInMemory);
    })

    it("Should be possible to update the rental information", async () => {
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

        const expectedReturnDate = dateProvider.addDays(2);
        const newTestExpectedReturnDate = dateProvider.addDays(1);
        const newTestEndDate = dateProvider.addDays(3);

        const rental = await createRentalUseCase.execute({propertyId: property.id, userId: user.id, expectedReturnDate});

        const rentalsBefore = await rentalsRepositoryInMemory.findById(rental.id)

        const arrayBefore = await rentalsRepositoryInMemory.list();

        expect(arrayBefore.length).toEqual(1);
        expect(rentalsBefore.expectedReturnDate).toEqual(expectedReturnDate);
        expect(rentalsBefore.endDate).toEqual(null);


        await updateRentalUseCase.execute({
            id: rental.id, 
            propertyId: rental.propertyId,
            userId: rental.userId, 
            startDate: rental.startDate, 
            expectedReturnDate: newTestExpectedReturnDate, 
            expectedTotalRate: 1234, 
            endDate: newTestEndDate
        })

        const rentalsAfter = await rentalsRepositoryInMemory.findById(rental.id)

        const arrayAfter = await rentalsRepositoryInMemory.list();

        expect(arrayAfter.length).toEqual(1);
        expect(rentalsAfter.expectedReturnDate).toEqual(newTestExpectedReturnDate);
        expect(rentalsAfter.expectedTotalRate).toEqual(1234)
        expect(rentalsAfter.endDate).toEqual(newTestEndDate);
    })

    it("Should not be possible to update information for a rental that does not exist", async () => {
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

        const newTestExpectedReturnDate = dateProvider.addDays(1);
        const newTestEndDate = dateProvider.addDays(3);

        await expect(updateRentalUseCase.execute({
            id: "89bf76f1-b7bf-4991-9dbb-a3d843e2b5ff", 
            propertyId: property.id,
            userId: user.id, 
            startDate: new Date(), 
            expectedReturnDate: newTestExpectedReturnDate, 
            expectedTotalRate: 1234, 
            endDate: newTestEndDate
        })).rejects.toEqual(new AppError("Rental not found!"));

    })
}) 
