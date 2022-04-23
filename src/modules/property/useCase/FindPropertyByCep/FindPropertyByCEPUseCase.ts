import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPropertyByCEPUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute(cep: string): Promise<Property> {
    const property = await this.propertiesRepository.findByCep(cep);

    return property;
  }
}

export { FindPropertyByCEPUseCase };
