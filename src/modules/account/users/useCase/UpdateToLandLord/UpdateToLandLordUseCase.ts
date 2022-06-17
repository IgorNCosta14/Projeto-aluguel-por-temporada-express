import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateToLandLordUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
      ) {}

    async execute(id: string): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if(user.userPermission > 1) {
            throw new AppError("User already is landlord or admin!")
        }

        await this.usersRepository.updateToLandLord(id);
    }
}

export { UpdateToLandLordUseCase }