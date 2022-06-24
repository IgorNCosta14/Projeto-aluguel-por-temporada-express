import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute({ propertyId, userId, expectedReturnDate}: ICreateRentalDTO): Promise<Rental> {
        
        const findProperty = await this.propertiesRepository.findById(propertyId);

        if(findProperty.available === false) {
            throw new AppError("Property not available!");
        }

        const startDate = this.dateProvider.dateNow();
        const endDate = expectedReturnDate;

        const dateDifference = this.dateProvider.compare(endDate, startDate)

        if(dateDifference <= 0) {
            throw new AppError("The return date cannot be less than the current date!");
        }

        const expectedTotalRate = ((Math.ceil(dateDifference))*findProperty.dailyRate);

        const rental = await this.rentalsRepository.create({ propertyId, userId, expectedReturnDate, expectedTotalRate });

        const available = false;
        const id = propertyId;

        await this.propertiesRepository.updateAvailableState(id, available)

        return rental;
    }
}

export { CreateRentalUseCase }