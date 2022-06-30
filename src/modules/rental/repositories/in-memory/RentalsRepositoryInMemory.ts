import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []

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
        const rental = new Rental()

        Object.assign(rental, {
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

        this.rentals.push(rental);

        return rental;
    }

    async delete(id: string): Promise<void> {
        const rentalIndex = this.rentals.findIndex((rental) => rental.id === id)

        this.rentals.splice(rentalIndex, 1);
    }

    async findRentalByUserId(userId: string): Promise<Rental[]> {
        const rentals = this.rentals.filter((rental) => rental.userId === userId);

        return rentals;
    }

    async findRentalByPropertyId(propertyId: string): Promise<Rental> {
        const rentals = this.rentals.find((rental) => rental.propertyId === propertyId);

        return rentals;
    }

    async findById(id: string): Promise<Rental> {
        const rentalIndex = this.rentals.find((rental) => rental.id === id);

        return rentalIndex;
    }

    async list(): Promise<Rental[]> {
        const rentals = this.rentals;

        return rentals;
    }

    async listFinishedRentals(): Promise<Rental[]> {
        const rentals = this.rentals.filter((rental) => rental.endDate != null || rental.totalRate != null);

        return rentals;
    }

    async listRentalsInProgress(): Promise<Rental[]> {
        const rentals = this.rentals.filter((rental) => rental.endDate === null || rental.totalRate === null);

        return rentals;
    }

    async update(id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
}

export { RentalRepositoryInMemory }