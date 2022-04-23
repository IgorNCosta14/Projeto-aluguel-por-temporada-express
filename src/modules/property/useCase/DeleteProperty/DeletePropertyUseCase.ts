import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class DeletePropertyUseCase {

    constructor(
        @inject("PropertiesRepository")
        private propertiesRepository: IPropertiesRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.propertiesRepository.delete(id)
        return
    }
}

export { DeletePropertyUseCase }