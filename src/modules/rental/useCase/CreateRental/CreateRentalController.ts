import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { propertyId, userId, startDate, expected_return_date} = request.body;

        const createPropertyUseCase = container.resolve(CreateRentalUseCase)

        const rental = await createPropertyUseCase.execute({ propertyId, userId, startDate, expected_return_date});

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };