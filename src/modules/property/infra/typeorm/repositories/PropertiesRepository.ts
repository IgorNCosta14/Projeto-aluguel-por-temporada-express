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
    propertyOwner,
    zipCode,
    typeProperty,
    available,
    dailyRate,
    createdAt,
    updatedAt,
  }: ICreatePropertyDTO): Promise<Property> {
    const property = this.repository.create({
      id,
      propertyName,
      description,
      propertyOwner,
      zipCode,
      typeProperty,
      available,
      dailyRate,
      createdAt,
      updatedAt,
    });

    await this.repository.save(property);

    return property;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({id});
  }
  
  async listAvailableProperty(): Promise<Property[]> {
    const allProperties = await this.repository.find();

    return allProperties;
  }
  
  async findById(id: string): Promise<Property> {
    const property = await this.repository.findOne({id});
    return property;
  }

  async findByZipCode(zipCode: string): Promise<Property> {
    const property = await this.repository.findOne({ zipCode });
    return property;
  }

  async findByTypeProperty(typeProperty: string): Promise<Property[]> {
    const typeQuery = await this.repository
      .createQueryBuilder("p")
      .where("typeProperty = :typeProperty", { typeProperty });

    const users = await typeQuery.getMany();

    return users;
  }
}

export { PropertiesRepository };
