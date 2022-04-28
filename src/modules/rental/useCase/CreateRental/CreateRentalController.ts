import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { propertyId, userId, expectedReturnDate} = request.body;

        const createPropertyUseCase = container.resolve(CreateRentalUseCase)

        const rental = await createPropertyUseCase.execute({ propertyId, userId, expectedReturnDate});

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };