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
    cep,
    type_of_property,
    daily_rate,
  }: ICreatePropertyDTO): Promise<Property> {

    const property = await this.propertiesRepository.create({
      propertyName,
      description,
      cep,
      type_of_property,
      daily_rate,
    });

    return property;
  }
}

export { CreatePropertyUseCase };
