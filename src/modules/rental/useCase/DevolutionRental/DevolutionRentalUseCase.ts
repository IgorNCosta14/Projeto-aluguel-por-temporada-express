import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IdateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository,

        @inject("DateProvider")
        private dateProvider: IDateProvider
    ){}
    
    async execute(rentalId: string): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rentalId);

        const property = await this.propertiesRepository.findById(rental.propertyId);

        rental.endDate = rental.expectedReturnDate;
        const rentalTotalRate = (this.dateProvider.compare(rental.endDate, rental.startDate)*property.dailyRate);

        rental.totalRate = rentalTotalRate;

        await this.rentalsRepository.create(rental);

        const available = true;
        const id = rental.propertyId

        await this.propertiesRepository.updateAvailableState(id, available);

        return rental
    }
}

export { DevolutionRentalUseCase }