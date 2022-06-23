import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rental } from "../infra/typeorm/entities/rental"

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    list(): Promise<Rental[]>;
    findRentalByUserId(userId: string): Promise<Rental>;
    findRentalByPropertyId(propertyId: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
}

export { IRentalsRepository }