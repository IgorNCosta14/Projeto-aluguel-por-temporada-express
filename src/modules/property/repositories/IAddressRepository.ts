import { ICreateAddressDTO } from "../dtos/ICreateAddress.DTO";
import { Address } from "../infra/typeorm/entities/address";

interface IAddressRepository {
    create(data: ICreateAddressDTO): Promise<Address>;
    findByZipCode(zipCode: string): Promise<Address>;
    findById(id: number): Promise<Address>;
    findAll(): Promise<Address[]>;
}

export { IAddressRepository }