import { container } from "tsyringe";
import { Request, Response } from "express";
import { UpdateRentalUseCase } from "./UpdateRentalUseCase";

class UpdateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {propertyId, userId, totalRate, startDate, expectedReturnDate, expectedTotalRate, endDate} = request.body;
        const { id } = request.params;

        const updateRentalUseCase = container.resolve(UpdateRentalUseCase)

        const rental = await updateRentalUseCase.execute({id, propertyId, userId, totalRate, startDate, expectedReturnDate, expectedTotalRate, endDate})

        return response.json(rental);
    }
}

export { UpdateRentalController }