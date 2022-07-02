import { ICreatePermissionDTO } from "../../dtos/ICreatePermissionDTO";
import { Permission } from "../../infra/typeorm/entities/permission";
import { IPermissionsRepository } from "../IPermissionsRepository";

class PermissionsRepositoryInMemory implements IPermissionsRepository {
    permissions: Permission[] = [];

    async create({
        name,
        isLandlord,
        isAdmin,
    }: ICreatePermissionDTO): Promise<Permission> {
        const permission = new Permission();

        Object.assign(permission, {
            id: (this.permissions.length + 1),
            name,
            isLandlord,
            isAdmin,
            createdAt: new Date(),
        });

        this.permissions.push(permission);

        return permission;
    }

    async findByName(name: string): Promise<Permission> {
       const permission = this.permissions.find((permission) => permission.name === name);

       return permission;
    }

    async findById(id: number): Promise<Permission> {
        const permission = this.permissions.find((permission) => permission.id === id);

        return permission;
    }

    async list(): Promise<Permission[]> {
        const permissions = this.permissions;

        return permissions;
    }

    async delete(id: number): Promise<void> {
        const permissionIndex = this.permissions.findIndex((permission) => permission.id === id);

        this.permissions.splice(permissionIndex, 1);
    }
}

export { PermissionsRepositoryInMemory }