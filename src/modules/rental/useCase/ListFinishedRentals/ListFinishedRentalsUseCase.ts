import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListFinishedRentalsUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}

    async execute() {
        const rentals = this.rentalsRepository.listFinishedRentals();

        return rentals;
    }
}

export { ListFinishedRentalsUseCase }