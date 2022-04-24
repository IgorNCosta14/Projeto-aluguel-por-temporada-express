import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserRentalUseCase } from "./FindUserRentalUseCase";

class FindUserRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.user;

      const findPropertyUseCase = container.resolve(FindUserRentalUseCase);

      const rental = await findPropertyUseCase.execute(id);

      return response.json(rental);
    }
}

export { FindUserRentalController };