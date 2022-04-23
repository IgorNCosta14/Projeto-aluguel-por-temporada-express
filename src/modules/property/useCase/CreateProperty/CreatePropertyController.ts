import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePropertyUseCase } from "./CreatePropertyUseCase";

class CreatePropertyController {
    async  handle(request: Request, response: Response): Promise<Response> {
    const { propertyName, description, cep, type_of_property, daily_rate } =
      request.body;

      const createPropertyUseCase = container.resolve(CreatePropertyUseCase)

      const property = await createPropertyUseCase.execute({propertyName, description, cep, type_of_property, daily_rate})

      return response.status(201).json(property);
  }
}

export { CreatePropertyController };
