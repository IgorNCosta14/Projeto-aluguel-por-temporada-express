import { UserRepositoryInMemory } from "@modules/account/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/account/users/useCase/CreateUser/CreateUserUseCase";
import { AddressRepositoryInMemory } from "@modules/property/repositories/in-memory/AddressRepositoryInMemory";
import { PropertiesRepositoryInMemory } from "@modules/property/repositories/in-memory/PropertiesRepositoryInMemory";
import { CreatePropertyUseCase } from "@modules/property/useCase/CreateProperty/CreatePropertyUseCase";
import { RentalsRepositoryInMemory } from "@modules/rental/repositories/in-memory/RentalsRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalUseCase } from "../CreateRental/CreateRentalUseCase";
import { DeleteRentalUseCase } from "./DeleteRentalUseCase";

let createPropertyUseCase: CreatePropertyUseCase;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let propertiesRepositoryInMemory: PropertiesRepositoryInMemory;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let deleteRentalUseCase: DeleteRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: DateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe("Delete rental", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory(); 
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        propertiesRepositoryInMemory = new PropertiesRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        dateProvider = new DateProvider()

        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
        createPropertyUseCase = new CreatePropertyUseCase(propertiesRepositoryInMemory, addressRepositoryInMemory);
        deleteRentalUseCase = new DeleteRentalUseCase(rentalsRepositoryInMemory);
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, propertiesRepositoryInMemory, dateProvider);
    })

    it("Should be possible to delete a rental", async () => {
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

        
        const rentalBefore = await rentalsRepositoryInMemory.list();

        expect(rentalBefore.length).toEqual(1);

        await deleteRentalUseCase.execute(rental.id);

        const rentalAfter = await rentalsRepositoryInMemory.list();
        
        expect(rentalAfter.length).toEqual(0);
    })
}) 
