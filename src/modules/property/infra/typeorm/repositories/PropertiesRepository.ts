import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { getRepository, Repository } from "typeorm";
import { Property } from "../entities/property";

class PropertiesRepository implements IPropertiesRepository {
  private repository: Repository<Property>;

  constructor() {
    this.repository = getRepository(Property);
  }

  async create({
    id,
    propertyName,
    description,
    cep,
    type_of_property,
    available,
    daily_rate,
    created_at,
  }: ICreatePropertyDTO): Promise<Property> {
    const property = this.repository.create({
      id,
      propertyName,
      description,
      cep,
      type_of_property,
      available,
      daily_rate,
      created_at,
    });

    await this.repository.save(property);

    return property;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async list(): Promise<Property[]> {
    const allProperties = await this.repository.find();

    return allProperties;
  }

  async findByCep(cep: string): Promise<Property> {
    const property = await this.repository.findOne({ cep });

    return property;
  }

  async findByTypeOfProperty(type_of_property: string): Promise<Property[]> {
    const typeQuery = await this.repository
      .createQueryBuilder("p")
      .where("type_of_property = :type_of_property", { type_of_property });

    const users = await typeQuery.getMany();

    return users;
  }
}

export { PropertiesRepository };
