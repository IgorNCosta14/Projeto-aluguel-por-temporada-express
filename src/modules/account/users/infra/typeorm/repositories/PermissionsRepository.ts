import { ICreatePermissionDTO } from "@modules/account/users/dtos/ICreatePermissionDTO";
import { IPermissionsRepository } from "@modules/account/users/repositories/IPermissionsRepository";
import { getRepository, Repository } from "typeorm";
import { Permission } from "../entities/permission";

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = getRepository(Permission);
  }
  
  async create({
    id,
    name,
    isLandlord,
    isAdmin,
    createdAt,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.repository.create({
      id,
      name,
      isLandlord,
      isAdmin,
      createdAt,
    });

    await this.repository.save(permission);

    return permission;
  }

  async list(): Promise<Permission[]> {
    const permissions = await this.repository.find();

    return permissions;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.repository.findOne(name);

    return permission;
  }
  
  async findById(id: string): Promise<Permission> {
    const permission = await this.repository.findOne(id);

    return permission;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PermissionsRepository };
