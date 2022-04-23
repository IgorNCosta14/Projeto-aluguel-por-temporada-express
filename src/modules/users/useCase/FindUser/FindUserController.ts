import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByNameUseCase } from "./FindUserUseCase";

class FindUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.query;
        const findUserUseCase = container.resolve(FindByNameUseCase)

        const users = await findUserUseCase.execute({ name: name as string })
        
        return response.json(users)
    }
}

export { FindUserController }