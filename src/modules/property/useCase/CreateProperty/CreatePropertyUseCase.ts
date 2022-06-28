import { ICreatePropertyDTO } from "@modules/property/dtos/ICreatePropertyDTO";
import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IAddressRepository } from "@modules/property/repositories/IAddressRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { AppError } from "@shared/errors/AppError";
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
    lateFee,
  }: ICreatePropertyDTO): Promise<Property> {

    if( dailyRate <= 0 ) {
      throw new AppError("Daily rate must be greater than zero!")
    }

    const address = await this.addressRepository.findByZipCode(zipCode)

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
        lateFee
      });

      return property;

    } else {

      const property = await this.propertiesRepository.create({
        propertyName,
        description,
        typeProperty,
        propertyOwner,
        propertyAddressId: address.id,
        propertyNumber,
        dailyRate,
        lateFee
      });

      return property;
    }
  }
}

export { CreatePropertyUseCase };
