import { ICreateUsersDTO } from "@modules/account/users/dtos/ICreateUserDTO";
import { User } from "@modules/account/users/infra/typeorm/entities/user";
import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    cpf,
    email,
    password,
  }: ICreateUsersDTO): Promise<User> {

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if(emailAlreadyInUse) {
      throw new AppError("Email already in use");
    }

    const cpfAlreadyRegistered = await this.usersRepository.findByCPF(cpf);

    if(cpfAlreadyRegistered) {
      throw new AppError("CPF already registered");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      cpf,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
