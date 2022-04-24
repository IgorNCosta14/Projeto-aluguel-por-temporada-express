import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/rental";

class RentalRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

   async create({
        id,
        propertyId,
        userId,
        totalRate,
        startDate,
        expected_return_date,
        endDate
    }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
        id,
        propertyId,
        userId,
        totalRate,
        startDate,
        expected_return_date,
        endDate
        })

        await this.repository.save(rental);
        return rental;
    }

    async list(): Promise<Rental[]> {
        const rentals = await this.repository.find();
        return rentals;
    }

    async findRentalByUser(userId: string): Promise<Rental> {
        const rental = await this.repository.findOne(userId);
        return rental;
    }

    async findRentalByPropertyName(propertyId: string): Promise<Rental> {
        const rental = await this.repository.findOne(propertyId);
        return rental;
    }
}

export { RentalRepository }