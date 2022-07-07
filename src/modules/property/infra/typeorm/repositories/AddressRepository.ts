import { ICreateAddressDTO } from "@modules/property/dtos/ICreateAddress.DTO";
import { IAddressRepository } from "@modules/property/repositories/IAddressRepository";
import { getRepository, Repository } from "typeorm";
import { Address } from "../entities/address";

class AddressRepository implements IAddressRepository {
    private repository: Repository<Address>;

    constructor() {
        this.repository = getRepository(Address);
    }

    async create({zipCode, country, state, city, street}: ICreateAddressDTO): Promise<Address> {
        const address = this.repository.create({zipCode, country, state, city, street});

        await this.repository.save(address);

        return address;
    }

    async findByZipCode(zipCode: string): Promise<Address> {
        const address = await this.repository.findOne({zipCode});

        return address;
    }

    async findById(id: number): Promise<Address> {
        const address = await this.repository.findOne(id);

        return address;
    }

    async findAll(): Promise<Address[]> {
        const addresses = await this.repository.find();

        return addresses;
    }
}

export { AddressRepository }