import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute({
    propertyName,
    description,
    zipCode,
    typeProperty,
    dailyRate, 
    propertyOwner,
  }: ICreatePropertyDTO): Promise<Property> {

    const property = await this.propertiesRepository.create({
      propertyName,
      description,
      zipCode,
      typeProperty,
      dailyRate,
      propertyOwner
    });

    return property;
  }
}

export { CreatePropertyUseCase };
