import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRentalUseCase } from "./DeleteRentalUseCase";

class DeleteRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteRentalUseCase = container.resolve(DeleteRentalUseCase)

        await deleteRentalUseCase.execute(id);

        return response.send();
    }
}

export { DeleteRentalController }