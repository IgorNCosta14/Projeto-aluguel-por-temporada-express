import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
    ){}

    async execute(id: string): Promise<void> {
        await this.rentalsRepository.delete(id);
    }
}

export { DeleteRentalUseCase }