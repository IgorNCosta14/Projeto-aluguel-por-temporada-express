import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id: rentalId } = request.params;
        
      const devolutionPropertyUseCase = container.resolve(DevolutionRentalUseCase)

      const rental = await devolutionPropertyUseCase.execute(rentalId);

      return response.json(rental);
    }
}

export { DevolutionRentalController }