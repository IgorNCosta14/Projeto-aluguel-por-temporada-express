import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePropertyUseCase } from "./DeletePropertyUseCase";

class DeletePropertyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: propertyId } = request.params;
        const { id: userId } = request.user;

        const deletePropertyUseCase = container.resolve(DeletePropertyUseCase)

        await deletePropertyUseCase.execute({propertyId, userId})

        return response.send();
    }
}

export { DeletePropertyController }