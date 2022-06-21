import { ICreateAddressDTO } from "../dtos/ICreateAddress.DTO";
import { Address } from "../infra/typeorm/entities/address";

interface IAddressRepository {
    create(data: ICreateAddressDTO): Promise<Address>;
    findByZipCode(zipCode: string): Promise<Address>;
    findById(id: string): Promise<Address>;
}

export { IAddressRepository }