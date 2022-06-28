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
    propertyAddressId,
    propertyNumber,
    typeProperty,
    available,
    dailyRate,
    createdAt,
    updatedAt,
    lateFee
  }: ICreatePropertyDTO): Promise<Property> {
    const property = this.repository.create({
      id,
      propertyName,
      description,
      propertyOwner,
      propertyAddressId,
      propertyNumber,
      typeProperty,
      available,
      dailyRate,
      createdAt,
      updatedAt,
      lateFee
    });

    await this.repository.save(property);

    return property;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({id});
  }
  
  async listAvailableProperty(): Promise<Property[]> {
    const allProperties = await this.repository.find({
      where: { available: true },
      relations:["address"]
    })

    return allProperties;
  }

  async updateAvailableState( id: string, available: boolean ): Promise<void> {
    const property = await this.repository.findOne({id})

    property.available = available

    await this.repository.save(property)
  }
  
  async findById(id: string): Promise<Property> {
    const property = await this.repository.findOne({
      where: {id: id},
      relations: ["address"]
    });
    return property;
  }

  async findByTypeProperty(typeProperty: string): Promise<Property[]> {
    const  property = await this.repository.find({
      where: { typeProperty: typeProperty },
      relations: ["address"]
    })

    return  property;
  }

  async findPropertyByAddressId(propertyAddressId: number): Promise<Property[]> {
    const property = await this.repository.find({
      where: {propertyAddressId: propertyAddressId},
      relations: ["address"]
    });
    return property;
  }

  async findPropertyByOwner(propertyOwner: string): Promise<Property[]> {
    const property = await this.repository.find({
      where: {propertyOwner: propertyOwner},
      relations: ["address"]
    });
    return property;
  }
}

export { PropertiesRepository };
