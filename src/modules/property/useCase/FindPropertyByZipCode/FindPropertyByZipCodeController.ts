import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPropertyByZipCodeUseCase } from "./FindPropertyByZipCodeUseCase";

class FindPropertyByZipCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { zipCode } = request.body;

    const findPropertyByZipCodeUseCase = container.resolve(FindPropertyByZipCodeUseCase);

    const property = await findPropertyByZipCodeUseCase.execute(zipCode);

    return response.json(property);
  }
}

export { FindPropertyByZipCodeController };
