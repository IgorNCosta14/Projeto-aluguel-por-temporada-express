import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"

@injectable()
class DeactivatingUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
      ) {}
      
    async execute(id: string): Promise<void> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found!")
        }

        user.activeUser = false;

        await this.usersRepository.deactivatingUser(user);
    }
}

export { DeactivatingUserUseCase }