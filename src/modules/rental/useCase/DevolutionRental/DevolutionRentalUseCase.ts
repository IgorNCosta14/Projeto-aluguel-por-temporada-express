import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
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

        if(rental.endDate != null || rental.totalRate != null) {
            throw new AppError("Rent already finished!")
        }

        const property = await this.propertiesRepository.findById(rental.propertyId);

        rental.endDate = this.dateProvider.dateNow()

        const totalDaysRental = Math.ceil(this.dateProvider.compare(rental.endDate , rental.startDate))

        const expectedDaysRental = Math.ceil(this.dateProvider.compare(rental.expectedReturnDate , rental.startDate))

        if(rental.expectedReturnDate >= rental.endDate) {
            rental.totalRate = rental.expectedTotalRate;

        } else {
            rental.totalLateFee = (totalDaysRental-expectedDaysRental)*property.lateFee;

            rental.totalRate = expectedDaysRental*property.dailyRate + rental.totalLateFee;
        }

        await this.rentalsRepository.create(rental);

        const available = true;
        const id = rental.propertyId;

        await this.propertiesRepository.updateAvailableState({id, available});

        return rental
    }
}

export { DevolutionRentalUseCase }