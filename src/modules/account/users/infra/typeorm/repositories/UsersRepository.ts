import { ICreateUsersDTO } from "@modules/account/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/account/users/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/user";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    cpf,
    email,
    password,
    createdAt,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      cpf,
      email,
      password,
      createdAt,
    });

    await this.repository.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ["permission"]
    });

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findByCPF(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ cpf });

    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const usersQuery = await this.repository
      .createQueryBuilder("u")
      .where("name = :name", { name });

    const users = await usersQuery.getMany();

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id }, relations: ["permission"] });

    return user;
  }

  async updateToLandLord(id: string): Promise<void> {
    const user = await this.repository.findOne(id);

    user.userPermission = 2;

    await this.repository.save(user);
  }

  async deactivatingUser(data: User): Promise<void> {
    await this.repository.save(data);
  }
}

export { UsersRepository };
