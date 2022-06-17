import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateToLandLordUseCase } from "./UpdateToLandLordUseCase";

class UpdateToLandLordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        
        const updateToLandLordUseCase = container.resolve(UpdateToLandLordUseCase)

        await updateToLandLordUseCase.execute(id);

        return response.send();
    }
}

export { UpdateToLandLordController }