import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsInProgressUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute() {
        const rentals = this.rentalsRepository.listRentalsInProgress();

        return rentals;
    }
}

export { ListRentalsInProgressUseCase }