import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository,
    ){}

    async execute({ propertyId, userId, expectedReturnDate}: ICreateRentalDTO): Promise<Rental> {
        
        const propertyNotAvailable = await this.propertiesRepository.findById(propertyId);

        if(propertyNotAvailable.available === false) {
            throw new AppError("Property not available!")
        }

        const rental = await this.rentalsRepository.create({ propertyId, userId, expectedReturnDate});

        const available = false;
        const id = propertyId

        await this.propertiesRepository.updateAvailableState(id, available)

        return rental;
    }
}

export { CreateRentalUseCase }