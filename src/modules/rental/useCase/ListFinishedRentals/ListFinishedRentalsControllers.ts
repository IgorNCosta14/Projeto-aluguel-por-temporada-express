import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListFinishedRentalsUseCase } from "./ListFinishedRentalsUseCase";

class ListFinishedRentalsControllers {
    async handle(request: Request, response: Response): Promise<Response> {
      const listRentalsInProgressUseCase = container.resolve(ListFinishedRentalsUseCase)

      const rentals = await listRentalsInProgressUseCase.execute();

      return response.json(rentals);
    }
}

export { ListFinishedRentalsControllers }