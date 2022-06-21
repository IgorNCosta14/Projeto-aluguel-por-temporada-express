import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindPropertyByOwnerUseCase } from "./FindPropertyByOwnerUseCase";

class FindPropertyByOwnerController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const findPropertyByOwnerUseCase = container.resolve(FindPropertyByOwnerUseCase)

        const properties = await findPropertyByOwnerUseCase.execute(id);

        return response.json(properties);
    }
}

export { FindPropertyByOwnerController }