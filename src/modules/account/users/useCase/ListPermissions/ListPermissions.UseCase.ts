import { inject, injectable } from "tsyringe";
import { Permission } from "../../infra/typeorm/entities/permission";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";

@injectable()
class ListPermissionsUseCase {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: IPermissionsRepository
    ) {}

    async execute(): Promise<Permission[]> {
        const permissions = await this.permissionsRepository.list();

        return  permissions;
    }
}

export { ListPermissionsUseCase }