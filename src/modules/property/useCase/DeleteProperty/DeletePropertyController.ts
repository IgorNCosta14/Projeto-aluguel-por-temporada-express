import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePropertyUseCase } from "./DeletePropertyUseCase";

class DeletePropertyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deletePropertyUseCase = container.resolve(DeletePropertyUseCase)

        await deletePropertyUseCase.execute(id)

        return response.send();
    }
}

export { DeletePropertyController }