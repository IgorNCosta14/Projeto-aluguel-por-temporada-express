import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    type_of_property : string
}


@injectable()
class FindPropertyByTypeUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute({ type_of_property }: IRequest): Promise<Property[]> {
    const property = await this.propertiesRepository.findByTypeOfProperty(type_of_property);

    return property;
  }
}

export { FindPropertyByTypeUseCase };
