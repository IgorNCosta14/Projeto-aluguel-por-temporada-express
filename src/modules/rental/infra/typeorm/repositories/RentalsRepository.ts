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
        totalLateFee,
        startDate,
        expectedReturnDate,
        expectedTotalRate,
        endDate
    }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
        id,
        propertyId,
        userId,
        totalRate,
        totalLateFee,
        startDate,
        expectedReturnDate,
        expectedTotalRate,
        endDate
        })

        await this.repository.save(rental);
        return rental;
    }

    async list(): Promise<Rental[]> {
        const rentals = await this.repository.find({relations: ["property", "user"]});
        return rentals;
    }

    async findRentalByUserId(userId: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { userId },
            relations: ["property", "user"]
        });

        return rentals;
    }

    async findRentalByPropertyId(propertyId: string): Promise<Rental> {
        const rental = await this.repository.findOne({ propertyId });
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ id });
        return rental;
    }

    async findUserRentals(id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { userId: id },
            relations: ["property", "user"]
        });
        return rentals;
    }

    async listFinishedRentals(): Promise<Rental[]> {
        const rentals = await this.repository.find({
            relations: ["property", "user"]
        });
        return rentals;
    }

    async listRentalsInProgress(): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { endDate: null },
            relations: ["property", "user"]
        });
        return rentals;
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({id: id });
    }
    async update(id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
}

export { RentalsRepository }