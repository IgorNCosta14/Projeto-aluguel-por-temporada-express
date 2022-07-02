import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/user";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository{
    Users: User[] = []

    async create({
        name,
        cpf,
        email,
        password
    }: ICreateUsersDTO): Promise<User> {
        const user = new User();
        
        Object.assign(user, {
            name,
            cpf,
            email,
            password,
            createdAt: new Date()
        });

        this.Users.push(user);

        return user;
    }

    async list(): Promise<User[]> {
        const users = this.Users;

        return users;
    }

    async updateToLandLord(id: string): Promise<void> {
        const user = this.Users.find((user) => user.id === id);

        user.userPermission = 2;

        this.Users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.Users.find((user) => user.email === email);

        return user;
    }

    async findByCPF(cpf: string): Promise<User> {
        const user = this.Users.find((user) => user.cpf === cpf);

        return user;
    }

    async findByName(name: string): Promise<User[]> {
        const user = this.Users.filter((user) => user.name === name);

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.Users.find((user) => user.id === id);

        return user;
    }

    async deactivatingUser(data: User): Promise<void> {
        this.Users.push(data);
    }
}

export { UserRepositoryInMemory }