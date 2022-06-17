import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePropertyUseCase } from "./CreatePropertyUseCase";

class CreatePropertyController {
  async  handle(request: Request, response: Response): Promise<Response> {
    const { propertyName, description, zipCode, typeProperty, dailyRate } = request.body;

    const { id: propertyOwner } = request.user;

    const createPropertyUseCase = container.resolve(CreatePropertyUseCase)

    const property = await createPropertyUseCase.execute({propertyName, description, zipCode, typeProperty, dailyRate, propertyOwner })

    return response.status(201).json(property);
  }
}

export { CreatePropertyController };
