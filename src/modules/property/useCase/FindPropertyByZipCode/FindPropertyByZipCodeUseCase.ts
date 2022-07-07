import { Property } from "@modules/property/infra/typeorm/entities/property";
import { IAddressRepository } from "@modules/property/repositories/IAddressRepository";
import { IPropertiesRepository } from "@modules/property/repositories/IPropertiesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPropertyByZipCodeUseCase {
  constructor(
    @inject("PropertiesRepository")
    private propertiesRepository: IPropertiesRepository,

    @inject("AddressRepository")
    private addressRepository: IAddressRepository
  ) {}

  async execute(zipCode: string): Promise<Property[]> {
    const addressId = await this.addressRepository.findByZipCode(zipCode);
    
    const property = await this.propertiesRepository.findPropertyByAddressId(addressId.id);

    return property;
  }
}

export { FindPropertyByZipCodeUseCase };
