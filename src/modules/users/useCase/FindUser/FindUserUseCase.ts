import { User } from "@modules/users/infra/typeorm/entities/user";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe"

interface IRequest {
    name : string
}

@injectable()
class FindByNameUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
      ) {}
    
    async execute({name}: IRequest): Promise<User[]> {
        const users = this.usersRepository.findByName(name);

        if(!users) {
            throw new AppError("User not found!")
        }

        return users;
    }
}

export { FindByNameUseCase }