import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository"
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

@injectable()
class DeletePropertyUseCase {

    constructor(
        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository,
    ) {}

    async execute({ propertyId, userId }): Promise<void> {
        const propertyExists = await this.propertiesRepository.findById(propertyId);

        if(!propertyExists) {
            throw new AppError("Property doesn't exist!");
        }

        if(propertyExists.propertyOwner != userId) {
            throw new AppError("User must be the owner of the property to delete it!");
        }

        await this.propertiesRepository.delete(propertyId)
        return
    }
}

export { DeletePropertyUseCase }