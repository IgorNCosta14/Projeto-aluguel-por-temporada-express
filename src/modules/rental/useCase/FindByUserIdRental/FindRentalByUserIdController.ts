import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindRentalByUserIdUseCase } from "./FindRentalByUserIdUseCase";

class FindRentalByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
      const { id } = request.user;

      const findRentalByUserIdUseCase = container.resolve(FindRentalByUserIdUseCase);

      const rental = await findRentalByUserIdUseCase.execute(id);

      return response.json(rental);
    }
}

export { FindRentalByUserIdController };