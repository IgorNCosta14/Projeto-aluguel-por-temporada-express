import { ICreatePropertyDTO } from "../dtos/ICreatePropertyDTO"
import { IUpdateAvailableStateDTO } from "../dtos/IUpdateAvailableStateDTO";
import { Property } from "../infra/typeorm/entities/property"

interface IPropertiesRepository {
  create(data: ICreatePropertyDTO): Promise<Property>;
  delete(id: string): Promise<void>;
  listAvailableProperty(): Promise<Property[]>;
  updateAvailableState( data: IUpdateAvailableStateDTO): Promise<void>;
  findById(id: string): Promise<Property>;
  findPropertyByAddressId(propertyAddressId: number):Promise<Property[]>;
  findByTypeProperty(typeProperty: string): Promise<Property[]>;
  findPropertyByOwner(propertyOwner: string): Promise<Property[]>;
}

export { IPropertiesRepository }