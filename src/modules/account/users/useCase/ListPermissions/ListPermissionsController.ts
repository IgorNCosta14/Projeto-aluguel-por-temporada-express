import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPermissionsUseCase } from "./ListPermissions.UseCase";

class ListPermissionsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listPermissionsUseCase = container.resolve(ListPermissionsUseCase)

        const permissions = await listPermissionsUseCase.execute();

        return response.json(permissions);
    }
}

export { ListPermissionsController }