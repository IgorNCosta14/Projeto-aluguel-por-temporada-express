import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    typeProperty : string
}


@injectable()
class FindPropertyByTypeUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}

  async execute({ typeProperty }: IRequest): Promise<Property[]> {
    const property = await this.propertiesRepository.findByTypeProperty(typeProperty);

    return property;
  }
}

export { FindPropertyByTypeUseCase };
