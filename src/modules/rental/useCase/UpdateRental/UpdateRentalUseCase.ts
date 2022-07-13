import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({id, propertyId, userId, startDate, expectedReturnDate, expectedTotalRate, endDate}: ICreateRentalDTO): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);

        if(!rental) {
            throw new AppError("Rental not found!")
        }

        // rental.propertyId = propertyId;
        // rental.userId = userId,
        // rental.startDate = startDate;
        // rental.expectedReturnDate = expectedReturnDate;
        // rental.expectedTotalRate = expectedTotalRate;
        // rental.endDate = endDate;

        if(propertyId) {
            rental.propertyId = propertyId;
        }
        
        if(userId) {
            rental.userId = userId;
        }
        
        if(startDate) {
            rental.startDate = startDate;
        }

        if(expectedReturnDate) {
            rental.expectedReturnDate = expectedReturnDate;
        }
        
        if(expectedTotalRate) {
            rental.expectedTotalRate = expectedTotalRate;
        }
        
        if(endDate) {
            rental.endDate = endDate;
        }

        await this.rentalsRepository.create(rental);

        return rental;
    }
}

export { UpdateRentalUseCase }