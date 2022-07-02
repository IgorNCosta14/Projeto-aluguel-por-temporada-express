import { ICreateUsersDTO } from "@modules/account/users/dtos/ICreateUserDTO";
import { User } from "@modules/account/users/infra/typeorm/entities/user";
import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Utils } from "@utils/Utils";
import { hash } from "bcryptjs";
import { container, inject, injectable } from "tsyringe";

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

    const utils = container.resolve(Utils)

    if(utils.validateEmail(email) === false) {
      throw new AppError("Invalid email!");
    }

    const emailAlreadyInUse = await this.usersRepository.findByEmail(email);

    if(emailAlreadyInUse) {
      throw new AppError("Email already in use!");
    }

    if(utils.validateCPF(cpf) === false) {
      throw new AppError("Invalid cpf!");
    }

    const cpfAlreadyRegistered = await this.usersRepository.findByCPF(cpf);

    if(cpfAlreadyRegistered) {
      throw new AppError("CPF already registered!");
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
