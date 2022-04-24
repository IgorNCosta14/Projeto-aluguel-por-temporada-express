import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute({ propertyId, userId, startDate, expected_return_date}: ICreateRentalDTO): Promise<Rental> {
        const rental = await this.rentalsRepository.create({ propertyId, userId, startDate, expected_return_date});

        return rental;
    }
}

export { CreateRentalUseCase }