import { FindByNameUseCase } from "@modules/users/useCase/FindUser/FindUserUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPropertyByCEPUseCase } from "./FindPropertyByCEPUseCase";

class FindPropertyByCEPController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cep } = request.body;

    const findPropertyByCEPUseCase = container.resolve(FindPropertyByCEPUseCase);

    const property = await findPropertyByCEPUseCase.execute(cep);

    return response.json(property);
  }
}

export { FindPropertyByCEPController };
