import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
      
        
      const devolutionPropertyUseCase = container.resolve(DevolutionRentalUseCase)

      await devolutionPropertyUseCase.execute();

      return response.send();
    }
}

export { DevolutionRentalController }