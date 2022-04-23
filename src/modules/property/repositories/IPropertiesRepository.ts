import { ICreatePropertyDTO } from "../dtos/ICreatePropertyDTO"
import { Property } from "../infra/typeorm/entities/property"

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
  delete(id: string): Promise<void>;
  list(): Promise<Property[]>;
  findByCep(cep:string):Promise<Property>;
  findByTypeOfProperty(type_of_property: string): Promise<Property[]>;
}

export { IPropertiesRepository }