import { FindByNameUseCase } from "@modules/users/useCase/FindUser/FindUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPropertyByTypeUseCase } from "./FindPropertyByTypeUseCase";

class FindPropertyByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type_of_property } = request.query;

    const findPropertyByTypeUseCase = container.resolve(FindPropertyByTypeUseCase);

    const property = await findPropertyByTypeUseCase.execute({ type_of_property: type_of_property as string });

    return response.json(property);
  }
}

export { FindPropertyByTypeController };
