import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICreatePermissionDTO } from "../../dtos/ICreatePermissionDTO";
import { Permission } from "../../infra/typeorm/entities/permission";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";

@injectable()
class CreatePermissionUseCase {
    constructor(
        @inject("PermissionsRepository")
        private permissionsRepository: IPermissionsRepository
    ) {}

   async execute({name, isLandlord, isAdmin}: ICreatePermissionDTO): Promise<Permission> {

        const permissionAlreadyExists = await this.permissionsRepository.findByName(name);

        if(permissionAlreadyExists) {
            throw new AppError("Permission name already in use!")
        }

       const permission = await this.permissionsRepository.create({ name, isLandlord, isAdmin })

       return permission;
   }
}

export { CreatePermissionUseCase }