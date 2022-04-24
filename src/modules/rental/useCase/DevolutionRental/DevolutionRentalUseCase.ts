import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject } from "tsyringe";

class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsrepository: IRentalsRepository
    ){}
    
    async execute(): Promise<void> {}
}

export { DevolutionRentalUseCase }