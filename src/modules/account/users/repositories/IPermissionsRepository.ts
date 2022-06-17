import { ICreatePermissionDTO } from "../dtos/ICreatePermissionDTO"
import { Permission } from "../infra/typeorm/entities/permission"

interface IPermissionsRepository {
    create(data: ICreatePermissionDTO): Promise<Permission>;
    findByName(name: string): Promise<Permission>;
    findById(id: number): Promise<Permission>;
    list(): Promise<Permission[]>;
    delete(id: number): Promise<void>;
}

export { IPermissionsRepository }