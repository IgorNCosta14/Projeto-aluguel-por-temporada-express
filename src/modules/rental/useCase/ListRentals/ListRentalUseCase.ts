import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject } from "tsyringe";

class ListRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute(): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.list();
        return rentals;
    }
}

export { ListRentalUseCase }