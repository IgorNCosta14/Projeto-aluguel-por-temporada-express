import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPropertyByZipCodeUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute(zipCode: string): Promise<Property> {
    const property = await this.propertiesRepository.findByZipCode(zipCode);

    return property;
  }
}

export { FindPropertyByZipCodeUseCase };
