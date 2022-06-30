import { ICreateAddressDTO } from "@modules/property/dtos/ICreateAddress.DTO";
import { Address } from "@modules/property/infra/typeorm/entities/address";
import { IAddressRepository } from "../IAddressRepository";

class AddressRepositoryInMemory implements IAddressRepository {
    addresses: Address[] = []

    async create({zipCode, country, state, city, street}: ICreateAddressDTO): Promise<Address> {
        const address = new Address();

        const id = this.addresses.length + 1

        Object.assign(address, {
            id,
            zipCode, 
            country, 
            state, 
            city, 
            street
        })

        this.addresses.push(address);

        return address;
    }

    async findByZipCode(zipCode: string): Promise<Address> {
        const address = this.addresses.find((address) => address.zipCode === zipCode);

        return address;
    }

    async findById(id: number): Promise<Address> {
        const address = this.addresses.find((address) => address.id === id);

        return address;
    }
}

export { AddressRepositoryInMemory }