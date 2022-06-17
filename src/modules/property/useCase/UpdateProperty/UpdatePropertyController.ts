import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePropertyUseCase } from "./UpdatePropertyUseCase";

class UpdatePropertyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { propertyName, description, zipCode, typeProperty, dailyRate } = request.body
        const { id: propertyOwner }  = request.user;
        const { id } = request.params;

        const updatePropertyUseCase = container.resolve(UpdatePropertyUseCase);

        const property = await updatePropertyUseCase.execute({id, propertyName, description, zipCode, typeProperty, dailyRate, propertyOwner })

        return response.status(201).json(property)
    }
}

export { UpdatePropertyController }