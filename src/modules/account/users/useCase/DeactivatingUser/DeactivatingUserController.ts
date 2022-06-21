import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeactivatingUserUseCase } from "./DeactivatingUserUseCase";

class DeactivatingUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deactivatingUserUseCase = container.resolve(DeactivatingUserUseCase);

        await deactivatingUserUseCase.execute(id);

        return response.send();
    }
}

export { DeactivatingUserController }