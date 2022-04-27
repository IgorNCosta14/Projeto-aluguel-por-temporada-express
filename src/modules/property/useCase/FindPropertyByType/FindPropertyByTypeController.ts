import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPropertyByTypeUseCase } from "./FindPropertyByTypeUseCase";

class FindPropertyByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { typeProperty } = request.query;

    const findPropertyByTypeUseCase = container.resolve(FindPropertyByTypeUseCase);

    const property = await findPropertyByTypeUseCase.execute({ typeProperty: typeProperty as string });

    return response.json(property);
  }
}

export { FindPropertyByTypeController };
