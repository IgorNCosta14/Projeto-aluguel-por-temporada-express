import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPropertyUseCase } from "./ListPropertyUseCase";

class ListPropertyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listPropertyUseCase = container.resolve(ListPropertyUseCase)

        const allProperties = await listPropertyUseCase.execute()

        return response.json(allProperties);
    }
}

export { ListPropertyController }