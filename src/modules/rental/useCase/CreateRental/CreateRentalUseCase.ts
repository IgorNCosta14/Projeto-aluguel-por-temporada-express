import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({ propertyId, userId, expectedReturnDate}: ICreateRentalDTO): Promise<Rental> {
        const userRentalAlreadyExists = await this.rentalsRepository.findRentalByUserId(userId);

        if(userRentalAlreadyExists) {
            throw new AppError("There's a rental in progress for user!")
        }

        const propertyRentalAlreadyExists = await this.rentalsRepository.findRentalByPropertyId(propertyId);

        if(propertyRentalAlreadyExists) {
            throw new AppError("Property not available!")
        }

        const rental = await this.rentalsRepository.create({ propertyId, userId, expectedReturnDate});

        return rental;
    }
}

export { CreateRentalUseCase }