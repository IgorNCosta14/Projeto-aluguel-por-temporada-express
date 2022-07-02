import { User } from "@modules/account/users/infra/typeorm/entities/user";
import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository"
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
        const users = await this.usersRepository.findByName(name);

        if(users.length === 0) {
            throw new AppError("No user found with this name!");
        }

        return users;
    }
}

export { FindByNameUseCase }