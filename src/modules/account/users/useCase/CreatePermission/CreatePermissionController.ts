import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

class CreatePermissionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, isLandlord, isAdmin } = request.body;

        const createPermissionUseCase = container.resolve(CreatePermissionUseCase);

        const permission = await createPermissionUseCase.execute({ name, isLandlord, isAdmin });

        return response.status(201).json(permission);
    }
}

export { CreatePermissionController }