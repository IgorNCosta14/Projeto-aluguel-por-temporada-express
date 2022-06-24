import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListRentalsInProgressUseCase } from "./ListRentalsInProgressUseCase";

class ListRentalsInProgressControllers {
    async handle(request: Request, response: Response): Promise<Response> {
      const listRentalsInProgressUseCase = container.resolve(ListRentalsInProgressUseCase)

      const rentals = await listRentalsInProgressUseCase.execute();

      return response.json(rentals);
    }
}

export { ListRentalsInProgressControllers }