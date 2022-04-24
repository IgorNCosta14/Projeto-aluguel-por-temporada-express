import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rental } from "../infra/typeorm/entities/rental"

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    list(): Promise<Rental[]>;
    findRentalByUser(userId: string): Promise<Rental>;
    findRentalByPropertyName(propertyId: string): Promise<Rental>;
}

export { IRentalsRepository }