import { Request, Response } from "express";
import { container } from "tsyringe"
import { ListRentalUseCase } from "./ListRentalUseCase"

class ListRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
      const listPropertyUseCase = container.resolve(ListRentalUseCase)

      const rentals = await listPropertyUseCase.execute();

      return response.json(rentals);
    }
}

export { ListRentalController }