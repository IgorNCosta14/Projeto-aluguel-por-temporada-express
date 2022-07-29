import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePropertyUseCase {
    constructor(
        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository
      ) {}

    async execute({ id, propertyName, description, propertyNumber, typeProperty, dailyRate, propertyOwner, lateFee }: ICreatePropertyDTO): Promise<Property> {
        const property = await this.propertiesRepository.findById(id);

        if(!property) {
            throw new AppError("Property does not exist!")
        }

        if(property.propertyOwner != propertyOwner) {
            throw new AppError("User must be the owner of the property to update it!")
        }

        if(propertyName) {
            property.propertyName = propertyName;
        }

        if(description) {
            property.description = description;
        }

        if(propertyNumber) {
            property.propertyNumber = propertyNumber;
        }

        if(typeProperty) {
            property.typeProperty = typeProperty;
        }

        if(dailyRate) {
            property.dailyRate = dailyRate;
        }

        if(lateFee) {
            property.lateFee = lateFee;
        }
        
        property.updatedAt = new Date();

        await this.propertiesRepository.create(property);

        return property;
    }
}

export { UpdatePropertyUseCase }