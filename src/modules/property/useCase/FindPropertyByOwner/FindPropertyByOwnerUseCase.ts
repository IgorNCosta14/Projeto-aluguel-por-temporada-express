import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class FindPropertyByOwnerUseCase{
    constructor(
        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository,
    ) {}
    
    execute(id: string) {
        const properties = this.propertiesRepository.findPropertyByOwner(id);

        return properties
    }
}

export { FindPropertyByOwnerUseCase }