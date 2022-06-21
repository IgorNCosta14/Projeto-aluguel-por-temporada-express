import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IAddressRepository } from "@modules/property/repositories/IAddressRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository,

    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute({
    propertyName,
    description,
    propertyOwner,
    typeProperty,
    dailyRate,
    propertyNumber,
    zipCode,
    country, 
    state, 
    city, 
    street,
  }: ICreatePropertyDTO): Promise<Property> {

    const address = await this.addressRepository.findByZipCode(zipCode)

    console.log(address)

    if(!address) {
      await this.addressRepository.create({
        zipCode,
        country, 
        state, 
        city, 
        street
      })

      const address = await this.addressRepository.findByZipCode(zipCode)

      const property = await this.propertiesRepository.create({
        propertyName,
        description,
        typeProperty,
        propertyOwner,
        propertyAddressId: address.id,
        propertyNumber,
        dailyRate,
      });

      return property;

    } else {

      console.log(address)

      const property = await this.propertiesRepository.create({
        propertyName,
        description,
        typeProperty,
        propertyOwner,
        propertyAddressId: address.id,
        propertyNumber,
        dailyRate,
      });

      return property;
    }
  }
}

export { CreatePropertyUseCase };
