import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject } from "tsyringe";

class FindUserRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute(id: string): Promise<Rental> {
        const rental = await this.rentalsRepository.findRentalByUser(id);
        return rental;
    }
}

export { FindUserRentalUseCase }