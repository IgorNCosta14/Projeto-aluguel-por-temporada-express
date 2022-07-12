import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindRentalByUserIdUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute(id: string): Promise<Rental[]> {
        const rental = await this.rentalsRepository.findRentalByUserId(id);

        if(rental.length === 0) {
            throw new AppError("Rental not found!")
        }

        return rental;
    }
}

export { FindRentalByUserIdUseCase }