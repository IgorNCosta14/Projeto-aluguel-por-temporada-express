import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListPropertyUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository
  ) {}
  execute(): Promise<Property[]> {
    const properties = this.propertiesRepository.list();
    return properties;
  }
}

export { ListPropertyUseCase };
