import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository"
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

@injectable()
class DeletePropertyUseCase {

    constructor(
        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository
    ) {}

    async execute(id: string): Promise<void> {
        const propertyExists = await this.propertiesRepository.findById(id);

        if(!propertyExists) {
            throw new AppError("Property doesn't exist!")
        }

        await this.propertiesRepository.delete(id)
        return
    }
}

export { DeletePropertyUseCase }