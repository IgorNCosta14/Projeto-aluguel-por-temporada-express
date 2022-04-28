import { ICreatePropertyDTO } from "../dtos/ICreatePropertyDTO"
import { Property } from "../infra/typeorm/entities/property"

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
  delete(id: string): Promise<void>;
  listAvailableProperty(): Promise<Property[]>;
  findById(id: string): Promise<Property>;
  findByZipCode(zipCode:string):Promise<Property>;
  findByTypeProperty(typeProperty: string): Promise<Property[]>;
}

export { IPropertiesRepository }