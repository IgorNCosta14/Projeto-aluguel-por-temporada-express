import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rental/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/rental";

class RentalsRepository implements IRentalsRepository {
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
        expectedReturnDate,
        endDate
    }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
        id,
        propertyId,
        userId,
        totalRate,
        startDate,
        expectedReturnDate,
        endDate
        })

        await this.repository.save(rental);
        return rental;
    }

    async list(): Promise<Rental[]> {
        const rentals = await this.repository.find({relations: ["property", "user"]});
        return rentals;
    }

    async findRentalByUserId(userId: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { userId },
            relations: ["user"]
        });
        return rental;
    }

    async findRentalByPropertyId(propertyId: string): Promise<Rental> {
        const rental = await this.repository.findOne({ propertyId });
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ id });
        return rental;
    }

}

export { RentalsRepository }