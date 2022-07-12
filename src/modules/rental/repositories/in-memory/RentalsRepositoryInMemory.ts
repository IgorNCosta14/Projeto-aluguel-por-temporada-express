import { ICreateRentalDTO } from "@modules/rental/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rental/infra/typeorm/entities/rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = []

    async create({
        id,
        propertyId,
        userId,
        totalRate = null,
        totalLateFee = null,
        expectedReturnDate,
        expectedTotalRate,
        endDate = null
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()

        if(!id) {
            Object.assign(rental, {
                propertyId,
                userId,
                totalRate,
                totalLateFee,
                startDate: new Date(),
                expectedReturnDate,
                expectedTotalRate,
                endDate
            })

            this.rentals.push(rental);

            return rental;
        } else { 
            const rental = await this.findById(id);

            rental.propertyId = propertyId,
            rental.userId = userId,
            rental.totalRate = totalRate,
            rental.totalLateFee = totalLateFee,
            rental.expectedReturnDate = expectedReturnDate,
            rental.expectedTotalRate = expectedTotalRate,
            rental.endDate = endDate

            return rental;
        }
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

export { RentalsRepositoryInMemory }